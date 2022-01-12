import { model, Schema, Types } from "mongoose";
import { CommandInterface } from "../../../typings";

// mongoose schema
const CommandSchema = new Schema<CommandInterface>({
  output: String,
  command: String
}, { timestamps: true })

// mongoose model
export const Command = model<CommandInterface>('Command', CommandSchema)
