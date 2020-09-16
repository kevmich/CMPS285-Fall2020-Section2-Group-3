CREATE TABLE [dbo].[Orders] (
    [Id]           INT              IDENTITY (1, 1) NOT NULL,
    [OrderNumber]  UNIQUEIDENTIFIER NOT NULL,
    [OrderItemId]  INT              NOT NULL,
    [DateStarted]  DATETIME         NOT NULL,
    [DateFinished] DATETIME         NULL,
    [Size]         VARCHAR (20)     NOT NULL,
    [IsComplete]   BIT              NOT NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id] ASC),
    CHECK ([Size]='large' OR [Size]='meduim' OR [Size]='small')
);



