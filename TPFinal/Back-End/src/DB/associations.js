import * as model from '../Middlewares/listimport';

//#region 
    model.User.hasMany(model.Account, { as: "accUser", foreignKey: "userId" });
    model.Account.belongsTo(model.User, { as: "userAcc", foreignKey: "userId" });
    
    model.User.hasMany(model.Kayak, { as: "kayakUser", foreignKey: "userId" });
    model.Kayak.belongsTo(model.User, { as: "userKayak", foreignKey: "userId" });

    model.Documenttype.hasMany(model.User, { as: "userDoc", foreignKey: "documentTypeId" });
    model.User.belongsTo(model.Documenttype, { as: "docUser", foreignKey: "documentTypeId" });

    model.Role.hasMany(model.Account, { as: "accRole", foreignKey: "roleId" });
    model.Account.belongsTo(model.Role, { as: "roleAcc", foreignKey: "roleId" });

    model.Account.hasMany(model.Hanger, { as: "hangerAcc", foreignKey: "accountId" });
    model.Hanger.belongsTo(model.Account, { as: "accHanger", foreignKey: "accountId" });

    // model.Account.hasMany(model.Accessory, { as: "accessoryAcc", foreignKey: "accountId" });
    // model.Accessory.belongsTo(model.Account, { as: "accAccessory", foreignKey: "accountId" });

    model.Account.hasMany(model.Location, { as: "locationAcc", foreignKey: "accountId" });
    model.Location.belongsTo(model.Account, { as: "accLocation", foreignKey: "accountId" });

    model.Account.hasMany(model.Kayak, { as: "kayakAcc", foreignKey: "accountId" });
    model.Kayak.belongsTo(model.Account, { as: "accKayak", foreignKey: "accountId" });

    model.Account.hasOne(model.PaymentType, { as: "paymentTypeAcc", foreignKey: "accountId" });
    model.PaymentType.belongsTo(model.Account, { as: "accPaymentType", foreignKey: "accountId" });

    model.Account.hasMany(model.Tariff, { as: "tariffAcc", foreignKey: "accountId" });
    model.Tariff.belongsTo(model.Account, { as: "accTariff", foreignKey: "accountId" });

    model.Account.hasMany(model.CalendarYear, { as: "calendarYearAcc", foreignKey: "accountId" });
    model.CalendarYear.belongsTo(model.Account, { as: "accCalendarYear", foreignKey: "accountId" });

    model.Account.hasOne(model.Payment, { as: "paymentAcc", foreignKey: "accountId" });
    model.Payment.belongsTo(model.Account, { as: "accPayment", foreignKey: "accountId" });

    model.Account.hasOne(model.KayakType, { as: "kayakTypeAcc", foreignKey: "accountId" });
    model.KayakType.belongsTo(model.Account, { as: "accKayakType", foreignKey: "accountId" });

    model.Account.hasOne(model.Product, { as: "productAcc", foreignKey: "accountId" });
    model.Product.belongsTo(model.Account, { as: "accProduct", foreignKey: "accountId" });

    model.Location.hasMany(model.Hanger, { as: "hangerLoc", foreignKey: "locationId" });
    model.Hanger.belongsTo(model.Location, { as: "locHanger", foreignKey: "locationId" });

    model.Hanger.belongsToMany(model.Kayak, 
        {
            as:'kayakHanger',
             through: 'kayakHangers', 
             foreignKey:'hangerId',
             otherKey: 'kayakId'
        });
    model.Kayak.belongsToMany(model.Hanger, 
    {
        as:'hangerKayak', 
        through: 'kayakHangers', 
        foreignKey:'kayakId',
        otherKey: 'hangerId'
    });

    // model.User.belongsToMany(model.Kayak, 
    //     {
    //         as:'kayakUser',
    //          through: 'userkayaks', 
    //          foreignKey:'userId',
    //          otherKey: 'kayakId'
    //     });
    // model.Kayak.belongsToMany(model.User, 
    // {
    //     as:'userKayak', 
    //     through: 'userkayaks', 
    //     foreignKey:'kayakId',
    //     otherKey: 'userId'
    // });

    model.Kayak.hasMany(model.Payment, { as: "paymentKayak", foreignKey: "kayakId" });
    model.Payment.belongsTo(model.Kayak, { as: "kayakPayment", foreignKey: "kayakId" });

    model.KayakType.hasMany(model.Kayak, { as: "KayakType", foreignKey: "kayakTypeId" });
    model.Kayak.belongsTo(model.KayakType, { as: "typeKayak", foreignKey: "kayakTypeId" });

    model.KayakType.hasMany(model.Tariff, { as: "tariffType", foreignKey: "kayakTypeId" });
    model.Tariff.belongsTo(model.KayakType, { as: "typeTariff", foreignKey: "kayakTypeId" });

    model.Tariff.hasMany(model.Payment, { as: "PaymentTariff", foreignKey: "tariffId" });
    model.Payment.belongsTo(model.Tariff, { as: "tariffPayment", foreignKey: "tariffId" });

    model.CalendarYear.hasOne(model.Quota, { as: "quotaCal", foreignKey: "calendarId" });
    model.Quota.belongsTo(model.CalendarYear, { as: "calQuota", foreignKey: "calendarId" });

    model.PaymentType.hasMany(model.Payment, { as: "paymentType", foreignKey: "paymentTypeId" });
    model.Payment.belongsTo(model.PaymentType, { as: "typePayment", foreignKey: "paymentTypeId" });

    model.Quota.hasMany(model.Payment, { as: "paymentQuota", foreignKey: "quotaId" });
    model.Payment.belongsTo(model.Quota, { as: "quotaPayment", foreignKey: "quotaId" });

    model.User.belongsToMany(model.UserContact, 
        {
            as:'contactUser',
             through: 'usercontacts', 
             foreignKey:'userId',
             otherKey: 'contactId'
        });
    model.Contact.belongsToMany(model.User, 
    {
        as:'userContact', 
        through: 'usercontacts', 
        foreignKey:'contactId',
        otherKey: 'userId'
    });

    model.Product.hasOne(model.ProductDetail, { as: "detailProd", foreignKey: "productId" });
    model.ProductDetail.belongsTo(model.Account, { as: "prodDetail", foreignKey: "productId" });

//#endregion