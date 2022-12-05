import {
    cLeading,
    cTopLeading,
    HStack,
    Spacer,
    Spinner,
    State,
    Text,
    TextField,
    UIButton,
    UIController,
    UIScene,
    VStack,
    cHorizontal,
    Toggle,
    cTop,
    Typography,
    cTrailing,
    Button
} from '@tuval/forms';

import { RealmBrokerClient, IGetTenantByIdResponse } from '../../Services/RealmBrokerClient';
import { TenantsGrid } from '../Views/TenantsGrid';
import { Color, UIImage, UIRouteLink, NavigateFunction, bindNavigate } from '@tuval/forms';
import { UITextBoxView } from '@realmocean/inputs';
import {UIDatePickerView, UIDateTimePickerView} from '@realmocean/calendars';
import { TenantsController } from './TenantsController';
import { Services } from '../../Services/Services';
import { UIButtonView } from '@realmocean/buttons';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { Views } from '../../Views/Views';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'
const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAYAAAAc0MJxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAABCUlEQVR4Xu3aMUoDQQCG0VzCY3gOm1zEThAsrT2GR/ImQtpAVjaCRVjxWxxxCa94A9P9fN3A7O4e9gSfx/008T2hIqEioSKhIqEioSKhIqEioSKhIqGiYaFuX07T6+F9k+ZtS5vXECoSKhIqEioSKhIqEioSKhoW6ub5ND29HTZp3ra0eY1hoa6dUJFQkVCRUJFQkVCRUJFQ0bBQnjCRUJFQkVCRUJFQkVCRUJFQkVCcCRUJFQkVCRUJFQkVCRUJFQ0L5ZNG5AkTCRUJFQkVCRUJFQkVCRUJVT0ez4O2aN62uHmFcaEuXY777/sv/V2oKyNUJFQkVCRUJFQkVCRUJFQkVPQVip/sdx+ddLpvQckwsAAAAABJRU5ErkJggg=='
export class AddTenantController extends UIController {

    @State()
    private checked: boolean;

    @State()
    private showErrors: boolean;

    @State()
    private tenant_info: IGetTenantByIdResponse;

    private tenantName: string;
    private tenantDescription: string;
    private tenantIsActive: boolean;



    public BindRouterParams({ tenant_id }) {

        if (tenant_id != null) {
            RealmBrokerClient.GetTenantById(tenant_id).then(result => {
                this.tenant_info = result;
                this.tenantName = result.tenant_name;
                this.tenantDescription = result.tenant_description;
            })
        }
    }
    public BindModel() {

    }

    private action_CreateTenant() {

        if (this.tenant_info != null) { //Edit tenant
            RealmBrokerClient.UpdateTenant(this.tenant_info.tenant_id, this.tenantName, this.tenantDescription).then(response => {
                this.navigotor('/app(realmmanager)/tenant/list', { replace: true });
            });
        } else { // New Tenant to add
            if (this.tenantName == null) {
                this.showErrors = true;
            } else {
                RealmBrokerClient.CreateTenant(this.tenantName, this.tenantDescription).then(response => {
                    this.navigotor('/app(realmmanager)/tenant/list', { replace: true });
                });
            }
        }
    }

    private ActionCancel(AppController_ContextAction_SetController: Function) {
        AppController_ContextAction_SetController(new TenantsController());
    }

    public LoadView(): any {
        this.navigotor = bindNavigate();
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Tenants'),
                        Views.RightSidePage({
                            title: 'Create Tenant',
                            content: (
                                VStack({ alignment: cTop })(
                                    VStack({ alignment: cTop, spacing: 10 })(
                                        Views.FormSection({
                                            title: 'General Info',
                                            content: (
                                                VStack({ spacing: 15 })(
                                                  //  UIDatePickerView().placeHolder('Date of work').width('100%'),
                                                    UITextBoxView().placeholder('Name of Tenant').floatlabel(true).width('100%').change(e => this.tenantName = e),
                                                    UITextBoxView().placeholder('Add a description').floatlabel(true).width('100%').change(e => this.tenantDescription = e)
                                                )
                                            )
                                        }),
                                        VStack({ alignment: cTrailing, spacing: 20 })(

                                            Button(
                                                Text('Create Tenant')
                                            )
                                                .color('success')
                                                .onClick(() => this.action_CreateTenant()),
                                            HStack(
                                                UIRouteLink(`/app(realmmanager)/tenant/list`)(
                                                    Text('Cancel')
                                                )
                                            ).height(),

                                        ).height()
                                    ).padding('1rem')
                                        .width(500).height(),

                                ).height().width()
                            )
                        })
                    )


                )
            )
        }
    }
}