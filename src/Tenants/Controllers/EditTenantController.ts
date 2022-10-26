import {
    Button, cTop, cTopLeading, cTrailing, HStack, Spinner, State,
    Text, UIController,
    UIScene,
    VStack
} from '@tuval/forms';

import { UITextBoxView } from '@realmocean/inputs';
import { bindNavigate, UIRouteLink } from '@tuval/forms';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { IGetTenantByIdResponse, RealmBrokerClient } from '../../Services/RealmBrokerClient';
import { Views } from '../../Views/Views';
import { TenantsController } from './TenantsController';
import { ITenant, useOrgProvider } from '@realmocean/common';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'
const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAYAAAAc0MJxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAABCUlEQVR4Xu3aMUoDQQCG0VzCY3gOm1zEThAsrT2GR/ImQtpAVjaCRVjxWxxxCa94A9P9fN3A7O4e9gSfx/008T2hIqEioSKhIqEioSKhIqEioSKhIqGiYaFuX07T6+F9k+ZtS5vXECoSKhIqEioSKhIqEioSKhoW6ub5ND29HTZp3ra0eY1hoa6dUJFQkVCRUJFQkVCRUJFQ0bBQnjCRUJFQkVCRUJFQkVCRUJFQkVCcCRUJFQkVCRUJFQkVCRUJFQ0L5ZNG5AkTCRUJFQkVCRUJFQkVCRUJVT0ez4O2aN62uHmFcaEuXY777/sv/V2oKyNUJFQkVCRUJFQkVCRUJFQkVPQVip/sdx+ddLpvQckwsAAAAABJRU5ErkJggg=='
export class EditTenantController extends UIController {

    @State()
    private formIsReady: boolean;

    @State()
    private updating: boolean;

    @State()
    private tenant_id: string;

    @State()
    private tenantName: string;

    @State()
    private tenantDescription: string;

    public BindRouterParams({ tenant_id }) {
        this.BeginUpdate();

        const orgService = useOrgProvider();
        if (tenant_id != null) {
            orgService.getTenantById(tenant_id).then(result => {
                this.tenant_id = tenant_id;
                this.tenantName = result.Name;
                this.tenantDescription = '';
                this.EndUpdate()
                this.formIsReady = true;
            })
        }
    }


    private action_UpdateTenant() {

        this.updating = true;

        const orgService = useOrgProvider();

        orgService.updateTenantById(this.tenant_id, this.tenantName, this.tenantDescription).then(result=>
            this.navigotor('/app(realmmanager)/tenant/list')
            );
        
    }

    public LoadView(): any {
        this.navigotor = bindNavigate();
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Tenants'),
                        Views.RightSidePage({
                            title: 'Update Tenant',
                            content: (
                                this.formIsReady ?
                                VStack({ alignment: cTop })(
                                    VStack({ alignment: cTop, spacing: 10 })(
                                        Views.FormSection({
                                            title: 'General Info',
                                            content: (
                                                VStack({ spacing: 15 })(
                                                    UITextBoxView().value(this.tenantName).placeholder('Name of Tenant').floatlabel(true).width('100%').change(e => this.tenantName = e),
                                                    UITextBoxView().value(this.tenantDescription).placeholder('Add a description').floatlabel(true).width('100%').change(e => this.tenantDescription = e)
                                                )
                                            )
                                        }),

                                        VStack({ alignment: cTrailing, spacing: 20 })(

                                            Button(
                                                this.updating ? Text('Updating') : Text('Update Tenant')
                                            )
                                            .loading(this.updating)
                                                .color('success')
                                                .onClick(() => this.action_UpdateTenant()),
                                            HStack(
                                                UIRouteLink(`/app(realmmanager)/tenant/list`)(
                                                    Text('Cancel')
                                                )
                                            ).height(),

                                        ).height()
                                    ).padding('1rem')
                                        .width(500).height(),

                                ).height().width()
                                :
                                Spinner()
                            )
                        })
                    )


                )
            )
        }
    }
}