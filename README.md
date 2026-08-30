# تطبيق متابعة منتجات الألبان

تطبيق ويب شامل لمتابعة منتجات الألبان والشاحنات والمبيعات مع قاعدة بيانات سحابية.

## المميزات

✅ إدارة منتجات الألبان (أنواع، كميات، تواريخ)
✅ متابعة الشاحنات (درجات الحرارة، الأختام)
✅ تتبع الشحنات والمبيعات
✅ نظام تسجيل الدخول الآمن
✅ واجهة عربية احترافية
✅ قاعدة بيانات سحابية (MongoDB Atlas)
✅ مشاركة البيانات بين المستخدمين

## المتطلبات

- Node.js v14+
- MongoDB Atlas Account
- npm أو yarn

## التثبيت

### 1. استنساخ المستودع
```bash
git clone https://github.com/moniemlatief94-debug/dairy-products-tracker.git
cd dairy-products-tracker
```

### 2. إعداد المتغيرات البيئية
```bash
cp .env.example .env
```

عدّل ملف `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dairy-tracker?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### 3. تثبيت المكتبات
```bash
npm run install-all
```

### 4. تشغيل التطبيق
```bash
npm run dev
```

السيرفر سيعمل على: `http://localhost:5000`
العميل سيعمل على: `http://localhost:3000`

## هيكل المشروع

```
dairy-products-tracker/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Truck.js
│   │   └── Shipment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── trucks.js
│   ├── middleware/
│   │   └── auth.js
│   └── index.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## قاعدة البيانات

### المجموعات (Collections):

1. **Users** - بيانات المستخدمين والمصادقة
2. **Products** - منتجات الألبان
3. **Trucks** - بيانات الشاحنات
4. **Shipments** - الشحنات والمبيعات

## API Endpoints

### المصادقة
- `POST /api/auth/register` - التسجيل
- `POST /api/auth/login` - تسجيل الدخول

### المنتجات
- `GET /api/products` - الحصول على جميع المنتجات
- `POST /api/products` - إضافة منتج جديد
- `PUT /api/products/:id` - تحديث منتج
- `DELETE /api/products/:id` - حذف منتج

### الشاحنات
- `GET /api/trucks` - الحصول على جميع الشاحنات
- `POST /api/trucks` - إضافة شاحنة جديدة
- `PUT /api/trucks/:id` - تحديث شاحنة
- `DELETE /api/trucks/:id` - حذف شاحنة

## المساهمة

نرحب بمساهماتك! يرجى عمل fork للمستودع وإرسال pull request.

## الترخيص

ISC License
