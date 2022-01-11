import { model, Schema } from "mongoose";
import { CommandInterface } from "../../../typings";

// mongoose schema
const CommandSchema = new Schema<CommandInterface>({
  command: {
    type: String,
    required: true
  },
  output: {
    type: String
  }
}, { timestamps: true })

// mongoose model
export const Command = model<CommandInterface>('Command', CommandSchema)
