import { VStack, cTopLeading, Icon, IconLibrary, Text, ForEach, HStack, cLeading, bindState, Color, UIRouteLink, CornerRadiusTypes, cHorizontal, cVertical } from '@tuval/forms';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif';
const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAD2ElEQVRoQ91ZWU8UQRDev+ODzyYmPpiYGDU8+KLREEyIiQai8eABJESIIBoBQQJBIgIKuiCHohIPhABeaESQYEARlUsQuY/lkC37W5xxe6d7tmfZZVm/5NuprtnurumprumuthHRmhkWkURZ12qoqvYlRcflMtW/e9nX71PZvSaKTy2mLbtPcfd8pVCpwriUImrv7CXHwiIrrmJxaZnOXbZD1P/3rLkNZR0zsw56/a6LYpIKUOTaVKVQacaSygaanJ5johEqRrtjfHKGCu1PIXJ9eKNQKSJGdmR0kolyWDVaAwYBbsTA9SmjUOnOzdujqPFVBzmdTlY0h69GA2i/pbWbtobFoMjZ4EmhUuPeyGT6/HWIiWpYi9EaBofHKOJYOkTOFncKlSAqogEr8IfRwMTULEXF8lHInULlnvBE6h8aZaIatIiQnGknuBOD3taOffGUU/jAEGm8wcxwgwKd9A2qGYyJmZp9B6KhHRkx4UbHppjoHRg4DCAD1wZXAOua2rxOOoyY/W4TREN9VaI+3Mkb6p+348LV5QoZV6tpafk3E+XA6Hp+9XxlbEqhK1abAQ/m+TZ1AW4x8OMXE+XA60JEYdDrrZUqE773+zAXCvXK5TXNpm6hEop8pTfDV1aclHejFqLr/64fOPvwzwkohZidc9CJhHyIXGf+5JnzxTTvkEeXrp4B2rTtKMRVo/EUeBoRoC+taoBo6MjfNHvbeCDMAYZVo993fEFBiE+9g4bYGyh6m1c1j1twsdn2H7lAYxPTLqUnEEku5lRAFHYSCJq9dSwp4CK2lKwyabz81j+itIDxJ80GEXrct2FXIcPDure4CBsPJFs/9LCLEQuLS5SYVipf0Cwz10jPq4YobDiQlA0kJml+ySOydXb3/VXxwCLo8OksiMKGA0m4QFFZHd2sqDcw8mSm3OjpmXk6dDwDorDhYFJq9NDIOO08kABRWDGY/L9GOpg+Db8V+TPo8umQjB4hGac32hcxPDpNujHQv4gbbe1xu7pRutLT1x5MDr1VHn5CYT2NzTQyrwwbZ+dy/kq5aV7EsHMBg7lHRFIGyRkZ8LYNe0RQZTceCMPXtBsHVfIeiDT+chWVvAfsgV0Mej2uEVAlw4S4vl4ZphdvPuLC1eUKoNVc3qXcSoiGdmQMSC4PtJo1nZtfkGZN0VbBrSeEhZnKyGqwlDXVqDJBPAGj/JGfxnGGluMQUajUGIyTAJUEp1DpzvU8c4EL7Tp4FkXOBk8KlSKG1OmWJ/15jogJjFNeq8tfoVKFvp7Y4v+oZ/XYw51CpVWqnI1jQYRvgPs930i2PwqX/heU4uCTAAAAAElFTkSuQmCC';

const menuModel = [
    {
        title: 'Insights',
        subItems: [
            {
                name: 'Overview',
                icon: "\\fa2f",
                link: '/app(realmmanager)/dashboard'

            }
        ]
    },
    {
        title: 'Realm Management',
        subItems: [

            {
                name: 'Tenants',
                icon: '\\ea40',
                link: '/app(realmmanager)/tenant/list'
            },
            {
                name: 'Accounts',
                icon: '\\fb14',
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
    {
        title: 'License Management',
        subItems: [

            {
                name: 'Licenses',
                icon: '\\e73c',
                link: '/app(realmmanager)/tenant/list'
            }
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
    {
        title: 'Settings',
        subItems: [

            {
                name: 'Auth',
                icon: '\\e897',
                link: '/app(realmmanager)/auth'
            }

        ]
    },
    {
        title: 'Other',
        subItems: [

            {
                name: 'Change Log',
                icon: '\\ea40',
                link: '/app(realmmanager)/changelog'
            },
            {
                name: 'Issues',
                icon: '\\ea40',
                link: '/app(realmmanager)/issues'
            },

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
        HStack({ alignment: cLeading, spacing: 10 })(
            Icon((IconLibrary as any).DonutLarge).size(30),
            Text('Realm Manager').fontWeight('600')
                .fontSize(14).lineHeight(24)
                .kerning('.06rem').fontFamily(fontFamily)
                .textTransform('uppercase'),
        ).height().padding(),
        ...ForEach(menuModel)(menu =>
            VStack({ alignment: cTopLeading })(
                Text(menu.title).fontWeight('600')
                    .fontSize('0.75rem').lineHeight('0.8rem')
                    .kerning('.06rem').fontFamily(fontFamily)
                    .padding('15px 10px 5px')
                    .textTransform('uppercase')
                    .foregroundColor('rgb(166,161,167)'),

                ...ForEach(menu.subItems as any)((subItem: any) =>
                    HStack(
                        UIRouteLink(subItem.link ?? '')(
                            HStack({ alignment: cLeading, spacing: 10 })(
                                Icon(subItem.icon).size(18).foregroundColor('rgb(197,199,216)'),
                                Text(subItem.name).fontSize(14).lineHeight('24px')
                            )
                                .cornerRadius(CornerRadiusTypes.Rounded)
                                .height()
                                .padding(cHorizontal, 16)
                                .padding(cVertical, 8)
                                .backgroundColor({ default: selectedItem === subItem.name ? 'rgb(242,242,248)' : '' , hover: 'rgb(242,242,248)' })
                                // .backgroundColor({ hover: '#CECECE66' })
                                //.foregroundColor({ hover: 'white' })
                                .cursor('pointer')
                        ).width('90%')
                    ).height()

                )
            ).height()
                /* .borderBottom('1px solid rgba(180,188,199,.32)')
                .paddingBottom('20px') */
        )
    )
        .background(Color.white)
        .width(220).minWidth('220px').maxWidth('220px')
        //.background('#031b4d')
        .fontSize(16)

)