import {
    CornerRadiusTypes,
    cTopLeading,
    ForEach,
    HStack,
    Icon,
    IconLibrary,
    IconType,
    ScrollView,
    Text,
    UIController,
    UIScene,
    VStack,
    cVertical,
    PositionTypes,
    Color,
    Cache,
    UIButton,
    State,
    Spacer,
    UIImage,
    cTop,
    ZStack,
    bindState,
    UIRoutes,
    UIRoute
} from '@tuval/forms';
import { TForm, cLeading, UIContextMenu, Context, UINavigate, bindNavigate, NavigateFunction, Typography } from '@tuval/forms';
import { is } from '@tuval/core';
import { CodeEditorView } from '@tuval/components/codeeditor';
import { model } from '../Models/menuModel';
import { menuItem } from '../Views/mainMenu';
import { TenantsController } from '../../Tenants/Controllers/TenantsController';
import { LeftSideMenuView } from '../Views/LeftSideMenu';
import { AccountsController } from '../../Accounts/Controllers/AccountsController';
import { AppsController } from '../../Apps/Controllers/AppsController';
import { DashboardController } from '../../Dashboard/Controllers/DashboardController';
import { AddEditTenantController } from '../../Tenants/Controllers/AddEditTenantController';
import { RealmBrokerClient } from '../../Services/RealmBrokerClient';
import { Services } from '../../Services/Services';
import { Routes } from '../Views/Routes';
import { theme } from '../../theme/theme';

const manifest = require('../../manifest');



export class AppController extends UIController {

    private form: TForm;

    @State()
    private realmName: string;

    @State()
    private SideBarExpanded: boolean;

    @State()
    private Code: string;

    @State()
    private currentController: UIController;


    protected InitController() {

    }

    @Context()
    private AppController_ContextAction_SetController(controller: UIController) {
        this.currentController = controller;
        (this as any).currentController.BindModel();
    }

    @Context()
    private GetTheme(): any {
        return theme;
    }

    private OnMenuSelected(item: any) {

    }
    public OnBindModel(form: TForm) {
        this.form = form;
        RealmBrokerClient.GetRealmInfo('REALM_NAME').then(realm_info => {
            this.realmName = realm_info.value;
        })
    }
    public LoadView() {
        console.log(theme);
        return (
            UIScene(
                HStack(
                    VStack(
                        Routes()
                    ).background(Color.white)
                )
            )
        ).background(Color.white)

    }
}