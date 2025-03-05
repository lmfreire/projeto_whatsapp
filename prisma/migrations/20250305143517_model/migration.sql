-- CreateTable
CREATE TABLE "Conversa" (
    "id" SERIAL NOT NULL,
    "contatoId" INTEGER NOT NULL,
    "dt_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_fim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversa" ADD CONSTRAINT "Conversa_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
