CREATE TABLE [dbo].[EmployeeRoles] (
    [Id]   INT          IDENTITY (1, 1) NOT NULL,
    [Role] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_EmployeeRoles] PRIMARY KEY CLUSTERED ([Id] ASC)
);

