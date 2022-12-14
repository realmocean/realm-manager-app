import { AccountsController } from './../../Accounts/Controllers/AccountsController';
import { UIRoute, UIRoutes, bindNavigate, bindState, useEffect } from '@tuval/forms';
import { EditAccountController } from '../../Accounts/Controllers/EditAccountController';
import { NewAccountController } from '../../Accounts/Controllers/NewAccountController';
import { DashboardController } from '../../Dashboard/Controllers/DashboardController';
import { AddTenantController } from '../../Tenants/Controllers/AddTenantController';
import { LayoutController } from '../Controllers/LayoutController';
import { TenantListController } from './../../Tenants/Controllers/TenantListController';
import { TenantsController } from './../../Tenants/Controllers/TenantsController';
import { AccountListController } from '../../Accounts/Controllers/AccountListController';
import { TenantAccountsList } from '../../Tenants/Controllers/TenantAccountsList';
import { AddNewAccountToTenant } from '../../Tenants/Controllers/AddNewAccountToTenant';
import { DeleteTenantController } from '../../Tenants/Controllers/DeleteTenantController';
import { DeleteAccountController } from '../../Accounts/Controllers/DeleteAccountController';
import { theme } from '../../theme/theme';
import { EditTenantAccount } from '../../Tenants/Controllers/EditTenantAccount';
import { ChangeLogController } from '../Controllers/ChangeLogController';
import { IssuesController } from '../../Issues/Controller/IssuesController';
import { NewIssueController } from '../../Issues/Controller/NewIssueController';
import { EditTenantController } from '../../Tenants/Controllers/EditTenantController';
import { AuthController } from '../../domains/settings/auth/controllers/AuthController';

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
            UIRoute('/app(realmmanager)/changelog', ChangeLogController),
            UIRoute('/app(realmmanager)/issues', IssuesController),
            UIRoute('/app(realmmanager)/issue/new', NewIssueController),

            UIRoute(
                UIRoute('list', TenantListController),
                UIRoute('add', AddTenantController),
                UIRoute(':tenant_id/add/account', AddNewAccountToTenant),
                UIRoute(':tenant_id/edit/account/:account_id', EditTenantAccount),

                UIRoute(':tenant_id/edit', EditTenantController),
                UIRoute(':tenant_id/delete', DeleteTenantController),
                UIRoute(':tenant_id/accounts', TenantAccountsList),

                //UIRoute('list', new RealmsController()),
                //UIRoute('realm/:realm_id/realm-dashboard', new RealmDashboardController()),
            )('tenant', TenantsController),
            UIRoute(
                UIRoute('list', AccountListController),
                UIRoute('add', NewAccountController),
                UIRoute(':account_id/edit', EditAccountController),
                UIRoute(':account_id/delete', DeleteAccountController),
                //UIRoute('list', new RealmsController()),
                //UIRoute('realm/:realm_id/realm-dashboard', new RealmDashboardController()),
            )('account', AccountsController),

            UIRoute('auth', AuthController),

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


