import Realm from 'realm';
export const CUSTOMERSLIST_SCHEMA = 'CustomersList';
export const CUSTOMERSADD_SCHEMA = 'CustomersAdd';

export const CustomerAddSchema = {
  name: CUSTOMERSADD_SCHEMA,
  primary_key: 'id',
  properties: {
    id: 'int', //primary key
    mobile: {type: 'int', indexed: true},
    name: {type: 'string', indexed: true},
    place: {type: 'string'},
    teperature: {type: 'float'},
    done: {type: 'bool', default: false},
  },
};

export const CustomerListSchema = {
  name: CUSTOMERSLIST_SCHEMA,
  primary_key: 'id',
  properties: {
    id: 'int', //primary key
    creationDate: 'date',
    customers: {type: 'list', objectType: CUSTOMERSADD_SCHEMA},
  },
};

const databaseOptions = {
  path: 'customerInfoApp.realm',
  schema: [CUSTOMERSLIST_SCHEMA, CUSTOMERSADD_SCHEMA],
  schemaVersion: 0,
};

//functions for Customers List
export const insertNewCustomer = (newCustomer) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          realm.create(CUSTOMERSLIST_SCHEMA, newCustomer);
          resolve(newCustomer);
        });
      })
      .catch((error) => reject(error));
  });

export const updateCustomer = (customer) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let updatingCustomer = realm.objectForPrimaryKey(
            CUSTOMERSLIST_SCHEMA,
            customer.id,
          );
          updatingCustomer.teperature = customer.temperature;
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const deleteCustomer = (customerId) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let deletingCustomer = realm.objectForPrimaryKey(
            CUSTOMERSLIST_SCHEMA,
            customerId,
          );
          realm.delete(deletingCustomer);
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const deleteAllCustomers = () =>
  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let allCustomers = realm.objects(CUSTOMERSLIST_SCHEMA);
          realm.delete(allCustomers);
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const queryAllCustomers = () =>
  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let allCustomers = realm.objects(CUSTOMERSLIST_SCHEMA);
          resolve(allCustomers);
        });
      })
      .catch((error) => reject(error));
  });

export default new Realm(databaseOptions);
