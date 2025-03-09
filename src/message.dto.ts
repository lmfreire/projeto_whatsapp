export class MessageDTO {
    message: ConversationDTO;
    remoteJid: string;
}

export class ConversationDTO {
    conversation: string;
}

export class ContatoDTO {
    numero: string;
}

export class ContatosDTO {
    id: number;
    numero: string;
}