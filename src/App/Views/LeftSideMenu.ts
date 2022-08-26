import { VStack, cTopLeading, Icon, IconLibrary, Text, ForEach, HStack, cLeading, bindState, Color, UIRouteLink } from '@tuval/forms';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif';

const menuModel = [
    {
        title: 'Insights',
        subItems: [
            {
                name: 'Dashboard',
                link: '/app(realmmanager)/dashboard'

            }
        ]
    },
    {
        title: 'Realm Management',
        subItems: [

            {
                name: 'Tenants',
                link: '/app(realmmanager)/tenant/list'
            },
            {
                name: 'Accounts',

                link: '/app(realmmanager)/account/list'
            },
          /*   {
                name: 'Account Pools',

            },
            {
                name: 'Licenses',

            },
            {
                name: 'Services',

            } */
        ]
    },
   /*  {
        title: 'Other',
        subItems: [
            {
                name: 'Notifications'
            },
            {
                name: 'Settings'
            },
            {
                name: 'Billing'
            },
            {
                name: 'Ensemble'
            }
        ]
    }, */

]

export const LeftSideMenuView = (realmName: string, selectedItem: string) => (
    VStack({ alignment: cTopLeading })(
      /*   HStack({ alignment: cTopLeading })(
            Icon((IconLibrary as any).DonutLarge).size(30).paddingLeft('15px'),
            Text(realmName).fontWeight('600')
                .fontSize('0.8rem').lineHeight('0.8rem')
                .kerning('.06rem').fontFamily(fontFamily)
                .padding('25px 20px 15px')
                .textTransform('uppercase'),
        ).height(), */
        ...ForEach(menuModel)(menu =>
            VStack({ alignment: cTopLeading })(
                Text(menu.title).fontWeight('600')
                    .fontSize('0.8rem').lineHeight('0.8rem')
                    .kerning('.06rem').fontFamily(fontFamily)
                    .padding('25px 10px 15px')
                    .textTransform('uppercase'),
                ...ForEach(menu.subItems)((subItem: any) =>
                    UIRouteLink(subItem.link ?? '')(
                        HStack({ alignment: cLeading })(
                            Text(subItem.name).fontFamily(fontFamily)
                                .padding('10px 20px').fontSize(16)
                                .lineHeight('1rem').fontWeight('400')
                                .height(36)
                        )
                            .background(selectedItem == subItem.name ? 'rgba(250,250,250,.2)' : '')
                            .fontWeight(selectedItem == subItem.name ? '700' : '400')
                            .cursor('pointer')
                    ).width('100%')

                )
            ).height()
                .borderBottom('1px solid rgba(180,188,199,.32)')
                .paddingBottom('20px')
        )
    ).width(220).minWidth('220px').maxWidth('220px')
        .background('#031b4d')
        .fontSize(16)
        .foregroundColor(Color.white)
)