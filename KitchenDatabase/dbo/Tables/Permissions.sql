CREATE TABLE [dbo].[Permissions] (
    [Id]           INT          IDENTITY (1, 1) NOT NULL,
    [PermissionId] INT          NOT NULL,
    [Name]         VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Permissions] PRIMARY KEY CLUSTERED ([Id] ASC)
);

