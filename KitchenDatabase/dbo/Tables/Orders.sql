CREATE TABLE [dbo].[Orders] (
    [Id]           INT                IDENTITY (1, 1) NOT NULL,
    [OrderNumber]  UNIQUEIDENTIFIER   NOT NULL,
    [OrderItemId]  INT                NOT NULL,
    [DateStarted]  DATETIMEOFFSET (7) NOT NULL,
    [DateFinished] DATETIMEOFFSET (7) NULL,
    [Size]         INT                NOT NULL,
    [IsComplete]   BIT                NOT NULL,
    [IsDeleted]    BIT                NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Orders_OrderItems] FOREIGN KEY ([OrderItemId]) REFERENCES [dbo].[OrderItems] ([Id])
);









