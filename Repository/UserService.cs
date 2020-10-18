using System;
using System.Collections.Generic;
using System.Text;
using Models;
using Models.Domain;
using Models.Entity;
namespace TokenBasedAuth.Services
{
    public interface IUserService
    {
        bool IsValidUser(UserModel user);
    }
    public class UserService : IUserService
    {
        public bool IsValidUser(UserModel user)
        {
            return true;
        }
    }
}