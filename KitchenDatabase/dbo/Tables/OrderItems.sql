CREATE TABLE [dbo].[OrderItems] (
    [Id]   INT          NOT NULL,
    [Name] VARCHAR (50) NOT NULL,
    [Type] VARCHAR (20) NOT NULL,
    CHECK ([Type]='drink' OR [Type]='food')
);

