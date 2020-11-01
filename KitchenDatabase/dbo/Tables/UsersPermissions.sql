CREATE TABLE [dbo].[UsersPermissions] (
    [UserId]       INT NOT NULL,
    [PermissionId] INT NOT NULL,
    CONSTRAINT [PK_UsersPermissions] PRIMARY KEY CLUSTERED ([UserId] ASC, [PermissionId] ASC),
    CONSTRAINT [FK_UsersPermissions_Permissions] FOREIGN KEY ([PermissionId]) REFERENCES [dbo].[Permissions] ([Id]),
    CONSTRAINT [FK_UsersPermissions_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);



