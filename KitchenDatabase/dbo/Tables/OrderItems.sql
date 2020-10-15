CREATE TABLE [dbo].[OrderItems] (
    [Id]    INT             NOT NULL,
    [Name]  VARCHAR (50)    NOT NULL,
    [Type]  INT             NOT NULL,
    [Price] DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_OrderItems] PRIMARY KEY CLUSTERED ([Id] ASC)
);







