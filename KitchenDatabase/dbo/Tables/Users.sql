CREATE TABLE [dbo].[Users] (
    [Id]       INT          NOT NULL,
    [Username] VARCHAR (50) NULL,
    [Password] VARCHAR (64) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);



