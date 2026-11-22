/* DATA: edit your app name, brand colour, areas, dishes, caterers, FAQs and support contact here. */
var BRAND={name:'Caters',accent:'#F4B31D'};
var AREAS=['Malleshwaram','Rajajinagar','Yelahanka','Frazer Town','Indiranagar','Jayanagar','JP Nagar','Koramangala','HSR Layout','Whitefield','Marathahalli','Electronic City'];
var ITEMS=[
{n:'Steamed rice',c:'Rice',e:'🍚',p:40,v:1,d:'Plain, fluffy basmati'},{n:'Veg biryani',c:'Rice',e:'🍛',p:120,v:1,d:'Dum-cooked with mint and fried onion',b:1},{n:'Chicken biryani',c:'Rice',e:'🍗',p:180,v:0,d:'Spiced chicken, saffron rice',b:1},
{n:'Paneer butter masala',c:'Curries',e:'🧀',p:140,v:1,d:'Creamy tomato gravy, soft paneer',b:1},{n:'Masala dosa',c:'Starters',e:'🥞',p:70,v:1,d:'Crisp dosa, potato filling'},{n:'Chapati',c:'Breads',e:'🫓',p:20,v:1,d:'Two soft, ghee-brushed'},
{n:'Fresh salad',c:'Starters',e:'🥗',p:30,v:1,d:'Cucumber, tomato, onion'},{n:'Payasam',c:'Sweets',e:'🍮',p:50,v:1,d:'Milk kheer with cashews'},{n:'Fish fry',c:'Starters',e:'🐟',p:160,v:0,d:'Masala-crusted, shallow fried'},
{n:'Sambar',c:'Curries',e:'🍲',p:30,v:1,d:'Lentil stew with vegetables'},{n:'Mutton curry',c:'Curries',e:'🍖',p:220,v:0,d:'Slow-cooked, rich red gravy'},{n:'Gulab jamun',c:'Sweets',e:'🍡',p:40,v:1,d:'Two warm, in sugar syrup'}];
var CATERERS=[
{n:'Leaf & Ladle',r:4.7,rv:312,open:1,a:['Malleshwaram','Rajajinagar','Yelahanka'],i:[0,1,4,6,7,9]},
{n:'Dum House Events',r:4.5,rv:228,open:1,a:['Frazer Town','Indiranagar','Koramangala'],i:[0,2,5,8,10,11]},
{n:'Sattvik Kitchen',r:4.8,rv:405,open:1,a:['Jayanagar','JP Nagar','HSR Layout','Koramangala'],i:[0,1,3,5,6,7,9,11]},
{n:'Grand Feast Co.',r:4.4,rv:156,open:0,a:['Whitefield','Marathahalli','Electronic City','Indiranagar'],i:[1,2,3,5,8,10,11]}];
BRAND.support={phone:'+91 00000 00000',email:'support@yourdomain.com',hours:'Daily, 9 am to 9 pm'};
var FAQS=[['How do I book a caterer?','Enter your event area on the Find tab, open a caterer, pick your dishes, set the guest count and tap Book. The caterer confirms shortly after.'],
['How is the price calculated?','Price per plate is the total of the dishes you pick. Food cost is that amount times your guests. Serving staff are ₹900 each, and we suggest one per 25 guests.'],
['Can I change or cancel a booking?','Contact us as early as you can with your booking details. Changes and refunds follow the caterer’s policy shown when you book.'],
['How many serving staff do I need?','One staff member per 25 guests works for most buffets. For plated service or large halls, add more.'],
['Is payment available in the app?','This preview does not take payments yet. Online payment will be added through a secure payment partner.'],
['Which areas do you cover?','Caterers are listed by area across Bengaluru. Type your area on the Find tab to see who serves it.']];
