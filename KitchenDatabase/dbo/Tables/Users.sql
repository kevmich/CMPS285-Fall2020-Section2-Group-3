CREATE TABLE [dbo].[Users] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [Username] VARCHAR (50) NOT NULL,
    [Password] VARCHAR (64) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);










GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Users]
    ON [dbo].[Users]([Username] ASC);

