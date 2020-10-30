using Microsoft.Extensions.Options;
using Models.Domain;
using Models.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{

    public interface IPermissionRepository
    {
        bool CanViewCashier(UserModel user);
    }
    public class PermissionRepository : IPermissionRepository
    {
        private string _connectionString = "";

        public PermissionRepository(IOptions<ConnectionStringsOptions> connectionStringsOptions)
        {
            //inject appsettings
            _connectionString = connectionStringsOptions.Value.KitchenVideoSystemDb;
        }

        public bool CanViewCashier(UserModel user)
        {
            return false;
        }

    }
}
