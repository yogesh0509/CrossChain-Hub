import express, { Express, Request, Response, NextFunction } from 'express';
import { encodeMyMethodCall } from './middleware/payloadEncoder'
import { CCIP } from "./constants/CCIP"

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/cross_chain/:currentChainId/:logic_contractChainId", (req: Request, res: Response, next: NextFunction) => {

  const currentChainId: string = req.params.currentChainId
  const logic_contractChainId: string = req.params.logic_contractChainId
  const {JSONInterface, args, address} = req.body

  // JSONInterface -> check if ABI can be directly converted!!
  // args -> decide if we want to pass an array directly!!
  const payload: string = encodeMyMethodCall(JSONInterface, args, address)

  res.status(200).json({
      senderContractAddress: CCIP[currentChainId].senderContractAddress,
      logicContractChainSelector: CCIP[logic_contractChainId].logicContractChainSelector,
      receiverContractAddress: CCIP[logic_contractChainId].receiverContractAddress,
      payload: payload
  })
})

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error("Not found");
  (error as any).status = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, () => {
  console.log("The application started successfully");
});
