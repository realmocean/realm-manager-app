import { AccountsController } from './../../Accounts/Controllers/AccountsController';
import { UIRoute, UIRoutes, bindNavigate, bindState, useEffect } from '@tuval/forms';
import { EditAccountController } from '../../Accounts/Controllers/EditAccountController';
import { NewAccountController } from '../../Accounts/Controllers/NewAccountController';
import { DashboardController } from '../../Dashboard/Controllers/DashboardController';
import { AddEditTenantController } from '../../Tenants/Controllers/AddEditTenantController';
import { LayoutController } from '../Controllers/LayoutController';
import { TenantListController } from './../../Tenants/Controllers/TenantListController';
import { TenantsController } from './../../Tenants/Controllers/TenantsController';
import { AccountListController } from '../../Accounts/Controllers/AccountListController';
import { TenantAccountsList } from '../../Tenants/Controllers/TenantAccountsList';
import { AddNewAccountToTenant } from '../../Tenants/Controllers/AddNewAccountToTenant';
import { DeleteTenantController } from '../../Tenants/Controllers/DeleteTenantController';
import { DeleteAccountController } from '../../Accounts/Controllers/DeleteAccountController';
import { theme } from '../../theme/theme';

export const Routes = () => {
    const [LoggedIn, setLoggedIn] = bindState(null);

    let navigate = bindNavigate();
    useEffect(() => {
        if (LoggedIn) {
            navigate("/app(realmmanager)/dashboard");
            return () => setLoggedIn(false)
        }
    }, [LoggedIn]);

    setLoggedIn(true);

    return UIRoutes(
        UIRoute(
            UIRoute('/app(realmmanager)/dashboard', DashboardController),
            UIRoute(
                UIRoute('list', TenantListController),
                UIRoute('add', AddEditTenantController),
                UIRoute(':tenant_id/add/account', AddNewAccountToTenant),
                UIRoute('edit/:tenant_id', AddEditTenantController),
                UIRoute('delete/:tenant_id', DeleteTenantController),
                UIRoute(':tenant_id/accounts', TenantAccountsList),

                //UIRoute('list', new RealmsController()),
                //UIRoute('realm/:realm_id/realm-dashboard', new RealmDashboardController()),
            )('tenant', TenantsController),
            UIRoute(
                UIRoute('list', AccountListController),
                UIRoute('add', NewAccountController),
                UIRoute('edit/:account_id', EditAccountController),
                UIRoute('delete/:account_id', DeleteAccountController),
                //UIRoute('list', new RealmsController()),
                //UIRoute('realm/:realm_id/realm-dashboard', new RealmDashboardController()),
            )('account', AccountsController),

        )('/app(realmmanager)', LayoutController),
        UIRoute('*', DashboardController) //.redirectTo('/app(realmmanager)/dashboard')
    ).setTheme(theme)
    /*
        UIRoutes(
            UIRoute('/app:realmmanager/tenant/list', new TenantsController()),
            UIRoute('/realm_manager/tenant/add', new AddEditTenantController()),
            UIRoute('/realm_manager/tenant/edit/:tenant_id', new AddEditTenantController()),
            UIRoute('/realm_manager/tenant/delete/:tenant_id', new DeleteTenantController()),

            UIRoute('/realm_manager/account/list', new AccountsController()),
            UIRoute('/realm_manager/account/add', new NewAccountController()),
            UIRoute('/realm_manager/account/edit/:account_id', new EditAccountController()),
            UIRoute('/realm_manager/account/delete/:account_id', new DeleteTenantController()),
        ) */
}


