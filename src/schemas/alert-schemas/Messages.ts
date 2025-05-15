import mongoose, { Schema, Document } from "mongoose";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export interface MessageType extends Document {
    userId: string;
    alertId: mongoose.Types.ObjectId;
    messages: Message[];
    isAlertFixed: boolean;
}

const MessageSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        alertId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Alert",
        },
        messages: [
            {
                role: {
                    type: String,
                    enum: ["user", "assistant"],
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
            },
        ],
        isAlertFixed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Message =
    mongoose.models.Message || mongoose.model<MessageType>("Message", MessageSchema);

export default Message; 