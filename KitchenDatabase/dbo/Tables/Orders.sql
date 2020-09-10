CREATE TABLE [dbo].[Orders] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]      VARCHAR (250) NOT NULL,
    [DateAdded] DATETIME      NOT NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id] ASC)
);

