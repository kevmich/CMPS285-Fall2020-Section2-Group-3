CREATE TABLE [dbo].[Employees] (
    [EmployeeId] VARCHAR (25) NOT NULL,
    [FirstName]  VARCHAR (75) NOT NULL,
    [LastName]   VARCHAR (75) NOT NULL,
    [Role]       INT          IDENTITY (1, 1) NOT NULL,
    CONSTRAINT [FK_Employees_EmployeeRoles] FOREIGN KEY ([Role]) REFERENCES [dbo].[EmployeeRoles] ([Id])
);



