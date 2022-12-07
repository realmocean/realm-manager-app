
import { } from '@realmocean/buttons';
import { is } from '@tuval/core';
import {
    Button, cHorizontal, Text, Toggle, cLeading, cTop, cTopLeading, cTopTrailing, cTrailing, cVertical, Dialog, HDivider, HStack, Icon, RenderingTypes,
    RequiredRule, ScrollView, Spacer, State, TextField, UIFormController, UIImage, VStack
} from '@tuval/forms';
import { DialogController } from '../../../../DialogController';
import { Views } from '../../../../Views/Views';

export class OAuth2ProviderSettingsDialog extends DialogController {

    @State()
    private enabled: boolean;

    @State()
    private provider_info: any;

    protected async BindRouterParamsAsync({ provider_info }): Promise<void> {

        this.setWidth(638);
        this.setHeight(729);

        return new Promise<void>((resolve, reject) => {
            this.provider_info = provider_info;
            resolve();
        });
    }



    protected override OnSubmit(data) {
        alert(JSON.stringify(data))

    }
    public override LoadView() {
        return (
            VStack({ alignment: cTopLeading, spacing: 20 })(
                HStack({ alignment: cLeading, spacing: 10 })(
                    HStack(
                        UIImage(this.provider_info.icon).imageWidth(30).imageHeight(30)
                    )
                        .width()
                        .height()
                        .border('solid 1px hsl(240 30% 96%)')
                        .padding(10).cornerRadius('50%').background('rgb(250,250,255)'),

                    Text(`${this.provider_info.name} OAuth2 Settings`).fontSize(24).fontWeight('500').fontFamily('"Poppins", arial, sans-serif'),
                    Spacer(),
                    HStack({ alignment: cTop })(
                        Icon('\\e5cd').size(20).cursor('pointer').onClick(() => this.OnCancel())
                    ).width()
                ).height(50),
                Text(`${this.provider_info.description ?? ''}`).render(RenderingTypes.Markdown).fontSize(24).fontWeight('400'),
                VStack({ alignment: cTopLeading, spacing: 30 })(
                    HStack({ alignment: cLeading, spacing: 8 })(
                        Toggle().checked(this.enabled).onToggleChange(e => this.enabled = e),
                        Text(this.enabled ? 'Enabled' : 'Disabled').foregroundColor('rgb(79,87,105)').paddingBottom('2px').fontSize(16).fontWeight('600').fontFamily('"Inter", arial, sans-serif')
                    ).height()
                    ,
                    ScrollView({ axes: cVertical, alignment: cTopLeading })(
                        VStack(
                            this.provider_info.view && this.provider_info.view(),
                            HDivider().height(20),
                            Views.TextInput()
                                .label('URI')
                                .formField('url', [new RequiredRule('URL must be set')]),
                        ).height()
                    )
                ).padding(10),


                HStack({ alignment: cTrailing, spacing: 10 })(
                    Button(
                        Text('Reset')
                    ).variant('outlined'),
                    Button(
                        Text('Cancel')
                    ).variant('outlined'),
                    Button(
                        Text('Add')
                    ).variant('outlined').onClick(() => this.Submit())
                ).height(),
            ).padding(20)
        )
    }

    public static Show(provider_info: any): Promise<void> {

        return new Promise<void>((resolve, reject) => {
            const dialog = new OAuth2ProviderSettingsDialog();
            dialog.BindRouterParamsAsync({ provider_info }).then(() => {
                dialog.ShowDialogAsync().then(() => {
                    resolve();
                })
            })
        });
    }
}