CREATE TABLE [dbo].[Employees] (
    [EmployeeId] INT          NOT NULL,
    [FirstName]  VARCHAR (75) NOT NULL,
    [LastName]   VARCHAR (75) NOT NULL,
    [Role]       INT          IDENTITY (1, 1) NOT NULL,
    CONSTRAINT [FK_Employees_EmployeeRoles] FOREIGN KEY ([Role]) REFERENCES [dbo].[EmployeeRoles] ([Id])
);

