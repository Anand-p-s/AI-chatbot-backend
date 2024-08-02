import { connect, disconnect } from "mongoose";

export async function connectToDb() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("Connection Failed");
  }
}

export async function disconnectDb() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Cannot disconnect");
  }
}
