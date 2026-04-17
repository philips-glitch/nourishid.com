// ===== SHARED DATA (menus, meal plans, workouts) =====

const menuDietData = [
    {
        id: 1, name: 'Oatmeal Pisang & Madu', meal: 'sarapan', type: 'balanced',
        emoji: '🥣', bg: 'linear-gradient(135deg, #E8D5B7, #D4B896)',
        desc: 'Oatmeal lembut dengan topping pisang segar, madu alami, dan taburan chia seed. Sempurna untuk memulai hari dengan energi tahan lama.',
        cal: 320, protein: 12, carbs: 52, fat: 8, fiber: 6, prep: '10 menit',
        ingredients: ['Oatmeal 50g', 'Pisang 1 buah', 'Madu 1 sdm', 'Chia seed 1 sdt', 'Susu rendah lemak 200ml', 'Kayu manis bubuk secukupnya'],
        steps: ['Masak oatmeal dengan susu rendah lemak hingga mengental (sekitar 5 menit).', 'Tuang ke mangkuk, biarkan sedikit dingin.', 'Iris pisang dan tata di atas oatmeal.', 'Siram dengan madu alami dan taburi chia seed serta kayu manis.'],
        tip: 'Gunakan rolled oats untuk tekstur lebih chewy. Tambahkan 1 scoop whey protein saat memasak untuk boost protein hingga 35g.'
    },
    {
        id: 2, name: 'Telur Orak-Arik & Alpukat Toast', meal: 'sarapan', type: 'high-protein',
        emoji: '🥑', bg: 'linear-gradient(135deg, #C8D8C0, #A8C8A0)',
        desc: 'Roti gandum panggang dengan alpukat creamy dan telur orak-arik lembut. Kaya protein dan lemak sehat untuk rasa kenyang lama.',
        cal: 420, protein: 24, carbs: 30, fat: 22, fiber: 8, prep: '12 menit',
        ingredients: ['Telur 2 butir', 'Roti gandum 2 lembar', 'Alpukat 1/2 buah', 'Garam & lada secukupnya', 'Minyak zaitun 1 sdt', 'Tomat cherry 4 buah', 'Daun selada'],
        steps: ['Panggang roti gandum hingga kecoklatan.', 'Kocok telur, bumbui dengan garam dan lada. Orak-arik di wajan dengan sedikit minyak zaitun.', 'Haluskan alpukat dengan garpu, beri sedikit garam dan perasan lemon.', 'Oles alpukat di atas roti, tambahkan telur orak-arik, dan garnish dengan tomat cherry belah.'],
        tip: 'Alpukat kaya akan lemak tak jenuh tunggal yang baik untuk jantung. Tambahkan taburan red pepper flakes untuk metabolisme boost.'
    },
    {
        id: 3, name: 'Smoothie Bowl Hijau', meal: 'sarapan', type: 'vegetarian',
        emoji: '🥝', bg: 'linear-gradient(135deg, #B8D4A8, #8BC48A)',
        desc: 'Smoothie bowl segar dengan bayam, pisang beku, dan topping granola crunchy. Penuh vitamin dan mineral untuk pagi yang berenergi.',
        cal: 290, protein: 10, carbs: 48, fat: 7, fiber: 7, prep: '7 menit',
        ingredients: ['Bayam segar 50g', 'Pisang beku 1 buah', 'Susu almond 100ml', 'Granola 30g', 'Blueberry 30g', 'Madu 1 sdt', 'Kelapa parut 1 sdm'],
        steps: ['Blender bayam, pisang beku, dan susu almond hingga creamy dan halus.', 'Tuang ke mangkuk.', 'Tata granola, blueberry, kelapa parut di atasnya.', 'Drizzle madu dan sajikan segera.'],
        tip: 'Bekukan pisang semalam sebelumnya untuk tekstur es krim. Bayam tidak akan terasa — hanya memberikan warna hijau dan nutrisi.'
    },
    {
        id: 4, name: 'Nasi Merah & Dada Ayam Panggang', meal: 'siang', type: 'high-protein',
        emoji: '🍗', bg: 'linear-gradient(135deg, #F0D0B0, #E8C098)',
        desc: 'Dada ayam panggang juicy dengan bumbu rempah khas Indonesia, disajikan dengan nasi merah dan tumis brokoli wortel.',
        cal: 480, protein: 42, carbs: 45, fat: 12, fiber: 5, prep: '30 menit',
        ingredients: ['Dada ayam 150g', 'Nasi merah 120g (matang)', 'Brokoli 80g', 'Wortel 50g', 'Bawang putih 2 siung', 'Kecap manis 1 sdm', 'Minyak zaitun 1 sdt', 'Lada hitam & garam'],
        steps: ['Marinasi dada ayam dengan bawang putih halus, kecap manis, lada hitam, dan garam selama minimal 15 menit.', 'Panggang ayam di teflon atau oven 180°C selama 15-20 menit hingga matang, balik sekali.', 'Tumis brokoli dan wortel dengan sedikit minyak zaitun dan bawang putih hingga matang tapi masih renyah.', 'Sajikan ayam panggang dengan nasi merah dan tumis sayuran.'],
        tip: 'Potong dada ayam horizontal menjadi 2 bagian agar lebih tipis dan matang merata. Jangan overcooked agar tetap juicy.'
    },
    {
        id: 5, name: 'Ikan Bakar Bumbu Padang', meal: 'siang', type: 'low-carb',
        emoji: '🐟', bg: 'linear-gradient(135deg, #F5D5C0, #E8B8A0)',
        desc: 'Ikan kakap bakar dengan bumbu padang yang kaya rempah, disajikan dengan lalapan segar dan sambal hijau.',
        cal: 380, protein: 38, carbs: 15, fat: 18, fiber: 4, prep: '35 menit',
        ingredients: ['Ikan kakap 200g', 'Cabai merah 5 buah', 'Bawang merah 4 butir', 'Bawang putih 3 siung', 'Kunyit 2 cm', 'Jahe 1 cm', 'Daun jeruk 3 lembar', 'Garam & gula secukupnya', 'Lalapan (timun, kemangi, selada)'],
        steps: ['Haluskan cabai, bawang merah, bawang putih, kunyit, dan jahe.', 'Tumis bumbu halus hingga harum, tambahkan daun jeruk, garam, dan sedikit gula.', 'Lumuri ikan dengan bumbu yang sudah matang, diamkan 10 menit.', 'Bakar ikan di atas bara atau panggang di oven 200°C selama 15-20 menit.', 'Sajikan dengan lalapan segar.'],
        tip: 'Balut ikan dengan daun pisang sebelum dibakar untuk aroma yang lebih harum dan menjaga kelembapan ikan.'
    },
    {
        id: 6, name: 'Buddha Bowl Tempe', meal: 'siang', type: 'vegetarian',
        emoji: '🥗', bg: 'linear-gradient(135deg, #C8D8C0, #B0C8A0)',
        desc: 'Buddha bowl bergizi dengan tempe panggang kecap, quinoa, edamame, dan dressing tahini. Plant-based dan mengenyangkan.',
        cal: 440, protein: 26, carbs: 48, fat: 18, fiber: 10, prep: '25 menit',
        ingredients: ['Tempe 150g', 'Quinoa/nasi merah 100g (matang)', 'Edamame 50g', 'Wortel parut 50g', 'Timun 50g', 'Kecap manis 1 sdm', 'Tahini 1 sdm', 'Lemon 1/2 buah', 'Wijen sangrai 1 sdt'],
        steps: ['Potong tempe tipis, marinasi dengan kecap manis. Panggang di teflon hingga kecoklatan kedua sisi.', 'Siapkan quinoa atau nasi merah yang sudah matang sebagai base.', 'Tata semua komponen di mangkuk: nasi/quinoa, tempe, edamame, wortel, timun.', 'Buat dressing: campur tahini, perasan lemon, sedikit air, dan garam. Siram di atas bowl.', 'Taburi wijen sangrai.'],
        tip: 'Tempe adalah superfood Indonesia! Fermentasi membuat protein kedelai lebih mudah dicerna dan menambah probiotik alami.'
    },
    {
        id: 7, name: 'Sup Ayam Sayuran', meal: 'malam', type: 'low-fat',
        emoji: '🍲', bg: 'linear-gradient(135deg, #F0E0C0, #E0D0A8)',
        desc: 'Sup ayam bening hangat dengan aneka sayuran. Rendah lemak, tinggi nutrisi, dan sangat cocok untuk makan malam ringan.',
        cal: 280, protein: 28, carbs: 22, fat: 8, fiber: 4, prep: '25 menit',
        ingredients: ['Ayam (paha tanpa kulit) 150g', 'Wortel 1 buah', 'Kentang 1 buah kecil', 'Buncis 50g', 'Daun bawang 2 batang', 'Bawang putih 3 siung', 'Jahe 2 cm', 'Garam, lada, pala bubuk'],
        steps: ['Rebus ayam dalam air bersama bawang putih geprek dan jahe hingga matang. Angkat, suwir-suwir.', 'Saring kaldu, masukkan kembali ke panci.', 'Tambahkan wortel dan kentang potong dadu, masak hingga empuk.', 'Masukkan buncis dan ayam suwir, bumbui dengan garam, lada, dan pala.', 'Sajikan hangat dengan taburan daun bawang iris.'],
        tip: 'Masak kaldu dalam jumlah banyak dan simpan di freezer. Bisa dipakai untuk berbagai masakan selama seminggu.'
    },
    {
        id: 8, name: 'Salmon Panggang & Asparagus', meal: 'malam', type: 'high-protein',
        emoji: '🍣', bg: 'linear-gradient(135deg, #F0C8B0, #E8A890)',
        desc: 'Salmon fillet panggang dengan herbs, asparagus roasted, dan ubi mashed. Kaya omega-3 untuk kesehatan jantung dan otak.',
        cal: 520, protein: 40, carbs: 32, fat: 24, fiber: 5, prep: '30 menit',
        ingredients: ['Salmon fillet 180g', 'Asparagus 100g', 'Ubi jalar 100g', 'Lemon 1/2 buah', 'Bawang putih 2 siung', 'Rosemary kering 1/2 sdt', 'Minyak zaitun 1 sdm', 'Garam & lada hitam'],
        steps: ['Bumbui salmon dengan garam, lada, rosemary, dan perasan lemon. Diamkan 10 menit.', 'Kukus ubi jalar hingga empuk, haluskan dengan sedikit susu dan garam.', 'Panggang salmon dan asparagus di oven 200°C selama 12-15 menit.', 'Plating: ubi mash sebagai base, salmon di atas, asparagus di samping. Beri perasan lemon.'],
        tip: 'Jangan overcooked salmon! Bagian tengah yang sedikit translucent (medium) justru yang paling nikmat dan nutrisinya terjaga.'
    },
    {
        id: 9, name: 'Tumis Tahu Sayuran', meal: 'malam', type: 'vegetarian',
        emoji: '🥘', bg: 'linear-gradient(135deg, #D8C8B0, #C8B898)',
        desc: 'Tahu sutra ditumis dengan paprika, jamur, dan saus tiram. Cepat, mudah, dan rendah kalori untuk makan malam sehat.',
        cal: 310, protein: 20, carbs: 28, fat: 14, fiber: 5, prep: '15 menit',
        ingredients: ['Tahu sutra 200g', 'Paprika merah 1/2 buah', 'Jamur champignon 100g', 'Brokoli 80g', 'Bawang putih 2 siung', 'Saus tiram 1 sdm', 'Kecap asin 1/2 sdm', 'Minyak wijen 1 sdt', 'Cabai rawit (opsional)'],
        steps: ['Potong tahu dadu besar. Goreng sebentar di teflon dengan sedikit minyak hingga kecoklatan. Angkat.', 'Tumis bawang putih iris hingga harum.', 'Masukkan jamur dan paprika, tumis 2 menit. Tambahkan brokoli.', 'Masukkan tahu, saus tiram, kecap asin, dan minyak wijen. Aduk rata.', 'Sajikan hangat. Tambahkan cabai rawit iris jika suka pedas.'],
        tip: 'Keringkan tahu dengan tisu dapur sebelum menggoreng agar permukaannya garing. Jangan terlalu sering diaduk agar tidak hancur.'
    },
    {
        id: 10, name: 'Energy Balls Kurma & Oat', meal: 'snack', type: 'balanced',
        emoji: '🟤', bg: 'linear-gradient(135deg, #C8B090, #B8A080)',
        desc: 'Bola energi no-bake dari kurma, oat, dan selai kacang. Camilan sehat kaya serat untuk mengganjal lapar sore hari.',
        cal: 180, protein: 6, carbs: 24, fat: 8, fiber: 3, prep: '10 menit',
        ingredients: ['Kurma tanpa biji 100g', 'Rolled oats 50g', 'Selai kacang 2 sdm', 'Coklat bubuk 1 sdm', 'Kelapa parut kering 2 sdm', 'Madu 1 sdt (opsional)'],
        steps: ['Blender kurma hingga menjadi pasta. Jika terlalu kering, tambahkan 1 sdm air.', 'Campur pasta kurma dengan oat, selai kacang, dan coklat bubuk di mangkuk.', 'Aduk rata hingga adonan bisa dibentuk.', 'Ambil 1 sdm adonan, bulatkan. Gulingkan di kelapa parut.', 'Simpan di kulkas minimal 30 menit sebelum dimakan. Tahan 5 hari.'],
        tip: 'Buat batch besar di hari Minggu untuk stok snack sehat seminggu. Simpan di wadah kedap udara dalam kulkas.'
    },
    {
        id: 11, name: 'Greek Yogurt & Buah', meal: 'snack', type: 'high-protein',
        emoji: '🫐', bg: 'linear-gradient(135deg, #D0C0E0, #C0B0D8)',
        desc: 'Greek yogurt plain dengan mixed berries dan drizzle madu. Tinggi protein dan probiotik untuk pencernaan sehat.',
        cal: 200, protein: 16, carbs: 22, fat: 5, fiber: 2, prep: '3 menit',
        ingredients: ['Greek yogurt plain 150g', 'Blueberry 30g', 'Strawberry 30g', 'Madu 1 sdt', 'Granola 15g (opsional)', 'Mint segar (garnish)'],
        steps: ['Tuang greek yogurt ke mangkuk.', 'Tata buah-buahan di atas yogurt.', 'Drizzle madu dan taburi granola.', 'Garnish dengan daun mint segar.'],
        tip: 'Pilih greek yogurt PLAIN, bukan yang sudah ada rasa. Yogurt berasa mengandung gula tambahan hingga 3x lipat.'
    },
    {
        id: 12, name: 'Edamame & Hummus', meal: 'snack', type: 'low-carb',
        emoji: '🫘', bg: 'linear-gradient(135deg, #C0D0B0, #A8C098)',
        desc: 'Edamame kukus hangat dengan homemade hummus sebagai dip. Snack kaya protein nabati yang mengenyangkan.',
        cal: 220, protein: 14, carbs: 18, fat: 10, fiber: 6, prep: '8 menit',
        ingredients: ['Edamame frozen 100g', 'Chickpea kalengan 100g', 'Tahini 1 sdm', 'Lemon 1/2 buah', 'Bawang putih 1 siung', 'Minyak zaitun 1 sdt', 'Garam & paprika bubuk'],
        steps: ['Kukus edamame selama 5 menit, tiriskan. Taburi sedikit garam.', 'Untuk hummus: blender chickpea, tahini, perasan lemon, bawang putih, dan minyak zaitun hingga halus.', 'Tambahkan air 1-2 sdm jika terlalu kental. Bumbui dengan garam.', 'Sajikan edamame dengan hummus di samping sebagai dip. Beri taburan paprika.'],
        tip: 'Edamame mengandung semua 9 asam amino esensial — menjadikannya salah satu sumber protein nabati terlengkap.'
    },
    {
        id: 13, name: 'Wrap Ayam Caesar', meal: 'siang', type: 'balanced',
        emoji: '🌯', bg: 'linear-gradient(135deg, #E0D0B8, #D0C0A0)',
        desc: 'Tortilla gandum berisi ayam panggang, romaine lettuce, parmesan, dan caesar dressing sehat. Praktis untuk bekal.',
        cal: 450, protein: 35, carbs: 38, fat: 16, fiber: 4, prep: '15 menit',
        ingredients: ['Tortilla gandum utuh 1 lembar', 'Dada ayam panggang 120g', 'Romaine lettuce 50g', 'Tomat 1/2 buah', 'Parmesan serut 1 sdm', 'Greek yogurt 2 sdm', 'Lemon 1/4 buah', 'Bawang putih halus 1/2 sdt', 'Lada hitam'],
        steps: ['Buat dressing: campur greek yogurt, perasan lemon, bawang putih halus, lada hitam, dan sedikit garam.', 'Iris dada ayam panggang tipis-tipis.', 'Letakkan tortilla, oles dressing di bagian tengah.', 'Tata selada, ayam, tomat iris, dan taburi parmesan.', 'Gulung rapat, potong diagonal. Bungkus aluminium foil jika untuk bekal.'],
        tip: 'Gunakan greek yogurt sebagai pengganti mayonnaise pada caesar dressing — rasanya tetap creamy tapi kalorinya 70% lebih rendah.'
    },
    {
        id: 14, name: 'Nasi Goreng Cauliflower', meal: 'siang', type: 'low-carb',
        emoji: '🍚', bg: 'linear-gradient(135deg, #E8D8C0, #D8C8B0)',
        desc: 'Nasi goreng rendah karbo menggunakan cauliflower rice sebagai pengganti nasi. Rasanya mirip nasi goreng asli!',
        cal: 320, protein: 22, carbs: 18, fat: 16, fiber: 6, prep: '20 menit',
        ingredients: ['Kembang kol 250g', 'Telur 2 butir', 'Wortel 1/2 buah (dadu kecil)', 'Kacang polong 30g', 'Bawang putih 2 siung', 'Bawang merah 2 butir', 'Kecap manis 1 sdm', 'Saus tiram 1/2 sdm', 'Minyak wijen 1 sdt'],
        steps: ['Potong kembang kol, blender atau parut kasar hingga menyerupai butiran nasi.', 'Tumis bawang putih dan bawang merah hingga harum.', 'Masukkan telur, orak-arik.', 'Tambahkan wortel dan kacang polong, tumis 2 menit.', 'Masukkan cauliflower rice, kecap manis, saus tiram. Aduk rata dengan api besar 3-4 menit.', 'Teteskan minyak wijen, sajikan.'],
        tip: 'Kunci cauliflower rice: jangan terlalu lama dimasak dan gunakan api besar agar tidak lembek. Hasilnya hampir tidak bisa dibedakan dari nasi goreng biasa!'
    },
    {
        id: 15, name: 'Pancake Oat Protein', meal: 'sarapan', type: 'high-protein',
        emoji: '🥞', bg: 'linear-gradient(135deg, #F0D8B0, #E8C898)',
        desc: 'Pancake sehat dari oat dan pisang, tanpa tepung terigu. Tinggi protein dan serat, cocok untuk sarapan mengenyangkan.',
        cal: 380, protein: 28, carbs: 42, fat: 10, fiber: 5, prep: '15 menit',
        ingredients: ['Rolled oats 60g', 'Pisang 1 buah', 'Telur 2 butir', 'Whey protein 1 scoop (opsional)', 'Baking powder 1/2 sdt', 'Kayu manis 1/4 sdt', 'Madu/maple syrup 1 sdm', 'Blueberry topping'],
        steps: ['Blender oat, pisang, telur, whey protein (opsional), baking powder, dan kayu manis hingga halus.', 'Panaskan teflon anti lengket dengan api kecil-sedang.', 'Tuang 1/4 adonan, masak hingga gelembung muncul di permukaan (~2 menit). Balik, masak 1 menit lagi.', 'Ulangi hingga adonan habis (jadi ~3 pancake).', 'Tumpuk pancake, tambahkan topping blueberry dan madu.'],
        tip: 'Kunci pancake fluffy: jangan terlalu sering dibalik dan gunakan api kecil. Satu balik saja cukup!'
    },
    {
        id: 16, name: 'Steak Tempe Lada Hitam', meal: 'malam', type: 'low-fat',
        emoji: '🥩', bg: 'linear-gradient(135deg, #D8C0A0, #C8B090)',
        desc: 'Tempe steak dengan saus lada hitam ala restoran. Alternatif steak sehat yang tinggi protein nabati dan rendah lemak.',
        cal: 340, protein: 24, carbs: 30, fat: 12, fiber: 8, prep: '20 menit',
        ingredients: ['Tempe 200g', 'Bawang putih 3 siung', 'Bawang bombay 1/2 buah', 'Lada hitam kasar 1 sdt', 'Kecap manis 2 sdm', 'Saus tiram 1 sdm', 'Mentega 1 sdt', 'Brokoli kukus (pelengkap)', 'Wortel kukus (pelengkap)'],
        steps: ['Potong tempe menjadi 2 lembar tebal (steak shape). Kukus 10 menit agar empuk.', 'Panaskan mentega, panggang tempe kedua sisi hingga kecoklatan. Angkat.', 'Di wajan yang sama, tumis bawang putih dan bawang bombay iris.', 'Tambahkan kecap manis, saus tiram, lada hitam kasar, dan 3 sdm air. Masak hingga mengental.', 'Siram saus lada hitam di atas tempe. Sajikan dengan brokoli dan wortel kukus.'],
        tip: 'Mengukus tempe sebelum dimasak menghilangkan rasa pahit dan membuat teksturnya lebih empuk menyerap bumbu.'
    },
    // ===== SARAPAN TAMBAHAN (17-36) =====
    {
        id: 17, name: 'Bubur Ayam Sehat', meal: 'sarapan', type: 'low-fat',
        emoji: '🥣', bg: 'linear-gradient(135deg, #F0E0C8, #E0D0B0)',
        desc: 'Bubur nasi lembut dengan topping ayam suwir, daun bawang, dan kacang tanah. Versi sehat tanpa minyak berlebihan.',
        cal: 310, protein: 22, carbs: 40, fat: 6, fiber: 2, prep: '25 menit',
        ingredients: ['Nasi putih 100g', 'Dada ayam 100g', 'Kaldu ayam 500ml', 'Daun bawang 2 batang', 'Bawang goreng 1 sdm', 'Kacang tanah sangrai 1 sdm', 'Kecap asin 1/2 sdm', 'Jahe 1 cm', 'Lada putih'],
        steps: ['Rebus dada ayam dengan jahe hingga matang. Suwir-suwir halus.', 'Masak nasi dengan kaldu ayam hingga menjadi bubur kental.', 'Bumbui dengan kecap asin dan lada putih.', 'Sajikan bubur, tambahkan ayam suwir, daun bawang, kacang tanah, dan bawang goreng.'],
        tip: 'Gunakan kaldu ayam homemade tanpa MSG untuk rasa gurih alami. Kurangi porsi bawang goreng untuk lebih rendah kalori.'
    },
    {
        id: 18, name: 'Roti Gandum Selai Kacang & Pisang', meal: 'sarapan', type: 'balanced',
        emoji: '🍞', bg: 'linear-gradient(135deg, #D8C8A8, #C8B890)',
        desc: 'Roti gandum panggang dengan selai kacang alami dan irisan pisang. Kombinasi sederhana tapi kaya energi.',
        cal: 350, protein: 14, carbs: 44, fat: 14, fiber: 6, prep: '5 menit',
        ingredients: ['Roti gandum 2 lembar', 'Selai kacang alami 2 sdm', 'Pisang 1 buah', 'Madu 1 sdt', 'Chia seed 1 sdt'],
        steps: ['Panggang roti gandum hingga crispy.', 'Oles selai kacang merata di atas roti.', 'Iris pisang tipis, tata di atas selai kacang.', 'Drizzle madu dan taburi chia seed.'],
        tip: 'Pilih selai kacang yang hanya mengandung kacang dan garam — tanpa gula tambahan atau minyak sawit.'
    },
    {
        id: 19, name: 'Nasi Uduk Sehat', meal: 'sarapan', type: 'balanced',
        emoji: '🍚', bg: 'linear-gradient(135deg, #E8E0D0, #D8D0C0)',
        desc: 'Nasi uduk gurih dengan santan rendah lemak, disajikan dengan telur balado dan tempe orek. Sarapan nusantara favorit.',
        cal: 420, protein: 18, carbs: 52, fat: 16, fiber: 3, prep: '30 menit',
        ingredients: ['Beras 100g', 'Santan encer 200ml', 'Daun salam 2 lembar', 'Serai 1 batang', 'Telur 1 butir', 'Tempe 50g', 'Cabai merah 3 buah', 'Bawang merah 3 butir', 'Garam'],
        steps: ['Masak beras dengan santan encer, daun salam, dan serai hingga matang.', 'Rebus telur, belah dua. Buat sambal balado sederhana.', 'Iris tempe tipis, orek dengan sedikit kecap dan bawang putih.', 'Sajikan nasi uduk dengan telur balado dan tempe orek.'],
        tip: 'Gunakan santan encer (lite coconut milk) untuk mengurangi kalori tanpa mengorbankan rasa gurih.'
    },
    {
        id: 20, name: 'Telur Dadar Sayuran', meal: 'sarapan', type: 'low-carb',
        emoji: '🥚', bg: 'linear-gradient(135deg, #F0E0B0, #E8D098)',
        desc: 'Telur dadar tebal berisi wortel, daun bawang, dan jagung. Tinggi protein, rendah karbo, siap dalam 10 menit.',
        cal: 280, protein: 20, carbs: 10, fat: 18, fiber: 2, prep: '10 menit',
        ingredients: ['Telur 3 butir', 'Wortel parut 30g', 'Jagung manis 30g', 'Daun bawang 1 batang', 'Garam & lada', 'Minyak zaitun 1 sdt'],
        steps: ['Kocok telur, tambahkan garam dan lada.', 'Masukkan wortel parut, jagung, dan daun bawang iris. Aduk rata.', 'Panaskan minyak zaitun di teflon. Tuang adonan telur.', 'Masak api kecil hingga bagian bawah set, lipat dan masak hingga matang.'],
        tip: 'Masak dengan api kecil agar telur dadar matang merata dan tidak gosong. Tebalnya yang membuatnya mengenyangkan.'
    },
    {
        id: 21, name: 'Overnight Oats Berry', meal: 'sarapan', type: 'vegetarian',
        emoji: '🫙', bg: 'linear-gradient(135deg, #D0B8D0, #C0A8C8)',
        desc: 'Oats yang direndam semalam dengan yogurt dan berry. Praktis disiapkan malam sebelumnya, tinggal ambil dari kulkas pagi hari.',
        cal: 300, protein: 14, carbs: 46, fat: 8, fiber: 6, prep: '5 menit + semalam',
        ingredients: ['Rolled oats 50g', 'Greek yogurt 100g', 'Susu almond 100ml', 'Mixed berry 50g', 'Madu 1 sdt', 'Chia seed 1 sdt', 'Vanilla extract 1/4 sdt'],
        steps: ['Campur oats, yogurt, susu almond, chia seed, dan vanilla di jar/wadah.', 'Aduk rata, tutup rapat.', 'Simpan di kulkas semalaman (min 6 jam).', 'Pagi hari, tambahkan topping mixed berry dan madu. Sajikan dingin.'],
        tip: 'Buat 3-4 jar sekaligus di malam Minggu untuk stok sarapan cepat selama weekday!'
    },
    {
        id: 22, name: 'Lontong Sayur Light', meal: 'sarapan', type: 'low-fat',
        emoji: '🥒', bg: 'linear-gradient(135deg, #C8D8B8, #B8C8A8)',
        desc: 'Lontong dengan kuah sayur labu siam dan kacang panjang. Versi ringan tanpa santan kental.',
        cal: 340, protein: 12, carbs: 55, fat: 8, fiber: 5, prep: '35 menit',
        ingredients: ['Lontong 150g', 'Labu siam 100g', 'Kacang panjang 50g', 'Tahu 50g', 'Santan encer 200ml', 'Lengkuas 2 cm', 'Daun salam 2 lembar', 'Bumbu halus: bawang merah, bawang putih, kunyit, kemiri'],
        steps: ['Haluskan bumbu, tumis hingga harum.', 'Masukkan santan encer, lengkuas, dan daun salam. Didihkan.', 'Tambahkan labu siam dan kacang panjang potong.', 'Masak hingga sayuran empuk. Masukkan tahu potong.', 'Sajikan lontong dengan kuah sayur.'],
        tip: 'Ganti lontong dengan nasi merah kepal untuk versi lebih tinggi serat dan indeks glikemik lebih rendah.'
    },
    {
        id: 23, name: 'Sandwich Tuna Sehat', meal: 'sarapan', type: 'high-protein',
        emoji: '🥪', bg: 'linear-gradient(135deg, #B8C8D8, #A8B8C8)',
        desc: 'Sandwich roti gandum dengan isian tuna, selada, dan tomat. Protein tinggi dari tuna untuk pagi berenergi.',
        cal: 380, protein: 30, carbs: 32, fat: 14, fiber: 4, prep: '10 menit',
        ingredients: ['Roti gandum 2 lembar', 'Tuna kalengan 80g (tiriskan)', 'Greek yogurt 1 sdm', 'Selada 2 lembar', 'Tomat 1/2 buah', 'Bawang bombay 1/4 buah', 'Lemon 1/4 buah', 'Garam & lada'],
        steps: ['Campurkan tuna dengan greek yogurt, perasan lemon, bawang bombay cincang, garam, dan lada.', 'Panggang roti gandum.', 'Letakkan selada di roti, tambahkan campuran tuna.', 'Tambahkan irisan tomat, tutup dengan roti kedua.'],
        tip: 'Gunakan greek yogurt sebagai pengganti mayonnaise untuk mengurangi lemak dan menambah protein.'
    },
    {
        id: 24, name: 'Mie Shirataki Goreng', meal: 'sarapan', type: 'low-carb',
        emoji: '🍜', bg: 'linear-gradient(135deg, #E0D0C0, #D0C0B0)',
        desc: 'Mie shirataki rendah kalori ditumis dengan sayuran dan telur. Hanya 50 kalori dari mie-nya!',
        cal: 220, protein: 14, carbs: 12, fat: 12, fiber: 4, prep: '12 menit',
        ingredients: ['Mie shirataki 200g', 'Telur 1 butir', 'Kol 50g iris', 'Wortel 30g julienne', 'Bawang putih 2 siung', 'Kecap manis 1 sdm', 'Saus tiram 1/2 sdm', 'Minyak wijen 1/2 sdt'],
        steps: ['Bilas shirataki, rebus 2 menit, tiriskan.', 'Tumis bawang putih, masukkan telur orak-arik.', 'Tambahkan kol dan wortel, tumis 2 menit.', 'Masukkan shirataki, kecap manis, saus tiram. Aduk rata api besar.', 'Teteskan minyak wijen, sajikan.'],
        tip: 'Shirataki harus direbus dulu untuk menghilangkan bau khasnya. Kunci rasa ada di bumbu dan sayurannya.'
    },
    {
        id: 25, name: 'Smoothie Mangga Protein', meal: 'sarapan', type: 'high-protein',
        emoji: '🥭', bg: 'linear-gradient(135deg, #F0D890, #E8C870)',
        desc: 'Smoothie mangga creamy dengan whey protein dan yogurt. Rasa tropis yang segar dan mengenyangkan.',
        cal: 340, protein: 28, carbs: 42, fat: 6, fiber: 3, prep: '5 menit',
        ingredients: ['Mangga beku 100g', 'Greek yogurt 100g', 'Whey protein vanilla 1 scoop', 'Susu almond 150ml', 'Madu 1 sdt', 'Es batu 3-4 buah'],
        steps: ['Masukkan semua bahan ke blender.', 'Blender hingga halus dan creamy (30-45 detik).', 'Tuang ke gelas, sajikan segera.'],
        tip: 'Bekukan mangga potong sendiri saat musimnya untuk stok smoothie sepanjang tahun dengan harga lebih murah.'
    },
    {
        id: 26, name: 'Nasi Goreng Kimchi', meal: 'sarapan', type: 'balanced',
        emoji: '🍳', bg: 'linear-gradient(135deg, #E8C0A0, #D8B090)',
        desc: 'Nasi goreng dengan kimchi fermentasi dan telur mata sapi. Kaya probiotik untuk kesehatan pencernaan.',
        cal: 400, protein: 16, carbs: 50, fat: 14, fiber: 3, prep: '15 menit',
        ingredients: ['Nasi putih/merah 150g', 'Kimchi 60g', 'Telur 1 butir', 'Bawang putih 2 siung', 'Kecap asin 1/2 sdm', 'Minyak wijen 1 sdt', 'Daun bawang 1 batang', 'Wijen sangrai'],
        steps: ['Tumis bawang putih dengan sedikit minyak.', 'Masukkan kimchi potong, tumis 1 menit.', 'Tambahkan nasi, kecap asin, aduk rata api besar 3 menit.', 'Teteskan minyak wijen, angkat.', 'Goreng telur mata sapi terpisah. Sajikan di atas nasi goreng dengan taburan wijen dan daun bawang.'],
        tip: 'Kimchi yang sudah fermentasi lama (lebih asam) memberikan rasa yang lebih kuat dan probiotik lebih banyak.'
    },
    {
        id: 27, name: 'Crepes Bayam & Keju', meal: 'sarapan', type: 'vegetarian',
        emoji: '🧀', bg: 'linear-gradient(135deg, #C8D0B0, #B8C0A0)',
        desc: 'Crepes tipis dari campuran bayam dengan isian keju dan jamur. Sarapan ala Eropa yang kaya nutrisi.',
        cal: 300, protein: 18, carbs: 28, fat: 14, fiber: 3, prep: '20 menit',
        ingredients: ['Tepung terigu 50g', 'Bayam 30g (blender halus)', 'Telur 1 butir', 'Susu 100ml', 'Keju mozzarella 30g', 'Jamur 50g iris', 'Garam & lada', 'Butter 1 sdt'],
        steps: ['Blender bayam dengan susu. Campur dengan tepung, telur, garam — aduk hingga lembut.', 'Panaskan teflon, buat crepes tipis. Masak kedua sisi.', 'Tumis jamur dengan sedikit butter, garam, lada.', 'Isi crepes dengan jamur tumis dan keju parut. Lipat dan sajikan hangat.'],
        tip: 'Diamkan adonan crepes 15 menit sebelum dimasak agar gluten relax dan hasilnya lebih lembut.'
    },
    {
        id: 28, name: 'Porridge Ubi Ungu', meal: 'sarapan', type: 'vegetarian',
        emoji: '🍠', bg: 'linear-gradient(135deg, #C8A8D0, #B898C0)',
        desc: 'Bubur ubi ungu manis alami dengan santan dan kacang hijau. Kaya antioksidan antosianin.',
        cal: 280, protein: 8, carbs: 50, fat: 6, fiber: 5, prep: '20 menit',
        ingredients: ['Ubi ungu 150g', 'Kacang hijau kupas 30g (rendam)', 'Santan encer 100ml', 'Gula aren 1 sdm', 'Garam sedikit', 'Daun pandan 1 lembar'],
        steps: ['Kukus ubi ungu hingga empuk, haluskan.', 'Rebus kacang hijau terpisah hingga empuk.', 'Panaskan santan encer dengan daun pandan, gula aren, dan garam.', 'Campurkan ubi halus dan kacang hijau. Sajikan hangat.'],
        tip: 'Ubi ungu mengandung antosianin — antioksidan kuat yang juga ditemukan di blueberry.'
    },
    {
        id: 29, name: 'Egg Muffin Meal Prep', meal: 'sarapan', type: 'high-protein',
        emoji: '🧁', bg: 'linear-gradient(135deg, #F0D0A0, #E8C090)',
        desc: 'Mini frittata yang dipanggang di cetakan muffin. Bisa di-meal prep untuk 5 hari sekaligus!',
        cal: 260, protein: 22, carbs: 8, fat: 16, fiber: 2, prep: '25 menit',
        ingredients: ['Telur 6 butir', 'Paprika 1/2 buah', 'Bayam 30g', 'Keju cheddar 30g', 'Tomat cherry 6 buah', 'Garam, lada, oregano', 'Cooking spray'],
        steps: ['Kocok telur dengan garam, lada, dan oregano.', 'Potong kecil paprika, bayam, tomat, dan keju.', 'Bagi sayuran ke 6 lubang cetakan muffin yang sudah di-spray.', 'Tuang kocokan telur merata ke setiap lubang.', 'Panggang 180°C selama 18-20 menit. Simpan di kulkas hingga 5 hari.'],
        tip: 'Hangatkan di microwave 30 detik sebelum dimakan. Variasikan isian setiap minggu agar tidak bosan.'
    },
    {
        id: 30, name: 'Açaí Bowl Tropis', meal: 'sarapan', type: 'low-fat',
        emoji: '🫐', bg: 'linear-gradient(135deg, #8878A8, #786898)',
        desc: 'Bowl açaí frozen dengan topping buah tropis dan granola. Superfood bowl yang Instagram-worthy dan penuh nutrisi.',
        cal: 310, protein: 8, carbs: 54, fat: 7, fiber: 8, prep: '8 menit',
        ingredients: ['Açaí frozen pack 100g', 'Pisang beku 1/2 buah', 'Susu almond 50ml', 'Granola 25g', 'Mangga potong 30g', 'Kelapa chip 1 sdm', 'Madu 1 sdt', 'Kiwi 1/2 buah'],
        steps: ['Blender açaí frozen, pisang beku, dan susu almond hingga tekstur es krim tebal.', 'Tuang ke mangkuk.', 'Tata topping: granola, mangga, kiwi, kelapa chip.', 'Drizzle madu, sajikan segera sebelum meleleh.'],
        tip: 'Jika açaí sulit ditemukan, ganti dengan campuran blueberry beku + sedikit kakao bubuk untuk rasa dan warna serupa.'
    },
    {
        id: 31, name: 'Ketupat Sayur Lodeh Light', meal: 'sarapan', type: 'low-fat',
        emoji: '🥬', bg: 'linear-gradient(135deg, #B8C8A0, #A8B890)',
        desc: 'Ketupat mini dengan lodeh sayuran tanpa santan kental. Sarapan tradisional yang lebih sehat.',
        cal: 360, protein: 10, carbs: 58, fat: 10, fiber: 5, prep: '30 menit',
        ingredients: ['Ketupat/lontong 150g', 'Labu siam 80g', 'Kacang panjang 50g', 'Tahu 50g', 'Santan encer 200ml', 'Daun salam, lengkuas, serai', 'Bumbu halus: bawang, kunyit, kemiri'],
        steps: ['Tumis bumbu halus bersama daun salam, lengkuas, serai hingga harum.', 'Tuang santan encer, didihkan.', 'Masukkan labu siam dan kacang panjang.', 'Setelah setengah empuk, tambahkan tahu potong.', 'Masak hingga matang, sajikan dengan ketupat.'],
        tip: 'Santan encer (cair) punya lemak 60% lebih sedikit dari santan kental tapi tetap memberi rasa gurih.'
    },
    {
        id: 32, name: 'French Toast Protein', meal: 'sarapan', type: 'high-protein',
        emoji: '🍯', bg: 'linear-gradient(135deg, #E8D0A8, #D8C098)',
        desc: 'French toast dari roti gandum dengan campuran telur dan protein powder. Crispy di luar, lembut di dalam.',
        cal: 390, protein: 32, carbs: 36, fat: 12, fiber: 4, prep: '12 menit',
        ingredients: ['Roti gandum 2 lembar', 'Telur 2 butir', 'Whey protein vanilla 1/2 scoop', 'Susu rendah lemak 50ml', 'Kayu manis 1/4 sdt', 'Madu 1 sdm', 'Strawberry 4 buah', 'Butter 1/2 sdt'],
        steps: ['Kocok telur, whey protein, susu, dan kayu manis hingga rata.', 'Celupkan roti ke campuran telur, pastikan meresap.', 'Panggang di teflon dengan sedikit butter hingga kecoklatan kedua sisi.', 'Sajikan dengan irisan strawberry dan drizzle madu.'],
        tip: 'Protein powder membuat French toast lebih crispy dan mengenyangkan. Pilih rasa vanilla untuk hasil terbaik.'
    },
    {
        id: 33, name: 'Bubur Kacang Hijau', meal: 'sarapan', type: 'vegetarian',
        emoji: '🟢', bg: 'linear-gradient(135deg, #B0C8A0, #98B888)',
        desc: 'Bubur kacang hijau hangat dengan gula aren dan santan. Comfort food Indonesia yang kaya protein nabati.',
        cal: 300, protein: 12, carbs: 50, fat: 6, fiber: 6, prep: '40 menit',
        ingredients: ['Kacang hijau 80g (rendam 4 jam)', 'Gula aren 30g', 'Daun pandan 2 lembar', 'Santan encer 100ml', 'Garam sedikit', 'Air 500ml'],
        steps: ['Rebus kacang hijau yang sudah direndam dengan air dan daun pandan.', 'Masak api kecil hingga kacang hijau empuk dan pecah (30-35 menit).', 'Tambahkan gula aren iris, aduk hingga larut.', 'Sajikan hangat dengan siraman santan encer dan sedikit garam.'],
        tip: 'Merendam kacang hijau 4-6 jam sebelumnya mempercepat waktu masak dan menghasilkan tekstur lebih lembut.'
    },
    {
        id: 34, name: 'Wrap Bayam & Feta', meal: 'sarapan', type: 'vegetarian',
        emoji: '🌿', bg: 'linear-gradient(135deg, #B8D0A8, #A8C098)',
        desc: 'Wrap gandum berisi tumisan bayam, keju feta, dan telur. Kombinasi Mediterranean yang segar dan bergizi.',
        cal: 330, protein: 18, carbs: 30, fat: 16, fiber: 4, prep: '12 menit',
        ingredients: ['Tortilla gandum 1 lembar', 'Bayam segar 50g', 'Keju feta 30g', 'Telur 1 butir', 'Bawang putih 1 siung', 'Tomat kering 2 potong', 'Minyak zaitun 1 sdt', 'Lada hitam'],
        steps: ['Tumis bawang putih dengan minyak zaitun, masukkan bayam. Masak hingga layu.', 'Orak-arik telur di wajan terpisah.', 'Hangatkan tortilla.', 'Isi dengan bayam tumis, telur orak-arik, feta crumble, dan tomat kering potong.', 'Gulung rapat, potong diagonal.'],
        tip: 'Feta bisa diganti ricotta untuk rasa lebih lembut, atau cottage cheese untuk protein lebih tinggi.'
    },
    {
        id: 35, name: 'Congee Jahe & Ayam', meal: 'sarapan', type: 'low-carb',
        emoji: '🍲', bg: 'linear-gradient(135deg, #E0D8C0, #D0C8B0)',
        desc: 'Congee ala Chinese dengan jahe dan ayam suwir. Menghangatkan badan dan mudah dicerna.',
        cal: 280, protein: 24, carbs: 28, fat: 8, fiber: 1, prep: '30 menit',
        ingredients: ['Beras 60g', 'Dada ayam 100g', 'Jahe 3 cm iris', 'Bawang putih 2 siung', 'Daun bawang 1 batang', 'Minyak wijen 1/2 sdt', 'Kecap asin 1 sdt', 'Lada putih', 'Air/kaldu 600ml'],
        steps: ['Masak beras dengan air/kaldu dan jahe iris hingga menjadi bubur (20-25 menit).', 'Rebus dada ayam terpisah, suwir halus.', 'Bumbui congee dengan kecap asin dan lada putih.', 'Sajikan dengan ayam suwir, daun bawang, dan teteskan minyak wijen.'],
        tip: 'Jahe segar mengandung gingerol yang anti-inflamasi dan membantu pencernaan — cocok untuk sarapan.'
    },
    {
        id: 36, name: 'Granola Bowl Homemade', meal: 'sarapan', type: 'balanced',
        emoji: '🥜', bg: 'linear-gradient(135deg, #D8C0A0, #C8B090)',
        desc: 'Granola panggang homemade dengan susu almond dan topping buah. Crunchy, manis alami, dan penuh serat.',
        cal: 350, protein: 10, carbs: 48, fat: 14, fiber: 6, prep: '5 menit (granola sudah jadi)',
        ingredients: ['Granola homemade 60g', 'Susu almond 200ml', 'Pisang 1/2 buah', 'Blueberry 20g', 'Madu 1 sdt', 'Almond slice 1 sdm'],
        steps: ['Tuang granola ke mangkuk.', 'Siram dengan susu almond dingin.', 'Tata pisang iris dan blueberry di atas.', 'Taburi almond slice dan drizzle madu.'],
        tip: 'Buat granola sendiri: campur oat, madu, minyak kelapa, kacang. Panggang 150°C 25 menit. Lebih murah dan tanpa gula berlebih.'
    },
    // ===== MAKAN SIANG TAMBAHAN (37-56) =====
    {
        id: 37, name: 'Gado-Gado Sehat', meal: 'siang', type: 'vegetarian',
        emoji: '🥗', bg: 'linear-gradient(135deg, #C8B898, #B8A888)',
        desc: 'Gado-gado klasik dengan bumbu kacang tanpa santan, lontong, dan aneka sayuran rebus segar.',
        cal: 400, protein: 18, carbs: 42, fat: 18, fiber: 8, prep: '25 menit',
        ingredients: ['Lontong 100g', 'Kacang panjang 50g', 'Tauge 50g', 'Kol 50g', 'Tahu goreng 50g', 'Telur rebus 1', 'Timun 50g', 'Bumbu kacang: kacang tanah, cabai, bawang putih, gula aren, air asam jawa'],
        steps: ['Rebus sayuran (kacang panjang, tauge, kol) hingga matang. Tiriskan.', 'Buat bumbu kacang: haluskan kacang sangrai, cabai, bawang putih. Tambahkan air asam jawa, gula aren.', 'Tata lontong, sayuran, tahu, telur rebus, dan timun di piring.', 'Siram dengan bumbu kacang.'],
        tip: 'Bumbu kacang homemade jauh lebih sehat dari bumbu instan — tanpa pengawet dan bisa kontrol gula.'
    },
    {
        id: 38, name: 'Sop Buntut Light', meal: 'siang', type: 'high-protein',
        emoji: '🍖', bg: 'linear-gradient(135deg, #E0C8B0, #D0B8A0)',
        desc: 'Sop buntut bening dengan sayuran lengkap. Kaldunya yang kaya kolagen baik untuk persendian dan kulit.',
        cal: 450, protein: 35, carbs: 30, fat: 18, fiber: 4, prep: '90 menit',
        ingredients: ['Buntut sapi 200g', 'Wortel 1 buah', 'Kentang 1 buah', 'Tomat 1 buah', 'Daun bawang, seledri', 'Bawang goreng 1 sdm', 'Pala, cengkeh, lada', 'Garam'],
        steps: ['Rebus buntut sapi hingga empuk (60-90 menit). Buang lemak di permukaan.', 'Tambahkan wortel dan kentang potong, masak 15 menit.', 'Masukkan tomat, bumbui dengan garam, pala, lada.', 'Sajikan dengan taburan bawang goreng, daun bawang, dan seledri.'],
        tip: 'Dinginkan kaldu di kulkas semalam — lemak akan mengeras di atas dan mudah dibuang untuk versi lebih rendah lemak.'
    },
    {
        id: 39, name: 'Poke Bowl Tuna', meal: 'siang', type: 'high-protein',
        emoji: '🐟', bg: 'linear-gradient(135deg, #A8B8D0, #98A8C0)',
        desc: 'Poke bowl ala Hawaii dengan tuna segar, nasi sushi, edamame, dan saus ponzu. Fresh dan penuh protein.',
        cal: 470, protein: 38, carbs: 45, fat: 14, fiber: 5, prep: '15 menit',
        ingredients: ['Tuna segar 150g (sashimi grade)', 'Nasi sushi 120g', 'Edamame 40g', 'Alpukat 1/4 buah', 'Timun 50g', 'Wortel 30g julienne', 'Kecap asin 1 sdm', 'Minyak wijen 1 sdt', 'Wijen, nori, daun bawang'],
        steps: ['Potong tuna dadu 2cm. Marinasi dengan kecap asin dan minyak wijen 5 menit.', 'Tata nasi sushi di bowl sebagai base.', 'Susun tuna, edamame, alpukat, timun, dan wortel di atas nasi.', 'Taburi wijen, nori potong, dan daun bawang.'],
        tip: 'Pastikan tuna sashimi-grade (beku dalam -20°C min 24 jam). Jika ragu, gunakan tuna kalengan sebagai alternatif aman.'
    },
    {
        id: 40, name: 'Pecel Sayuran', meal: 'siang', type: 'vegetarian',
        emoji: '🥬', bg: 'linear-gradient(135deg, #B8C0A0, #A8B090)',
        desc: 'Pecel dengan bumbu kacang khas Jawa Timur dan aneka sayuran rebus. Kaya serat dan protein nabati.',
        cal: 380, protein: 16, carbs: 38, fat: 18, fiber: 9, prep: '20 menit',
        ingredients: ['Bayam rebus 50g', 'Kacang panjang 50g', 'Tauge 50g', 'Kol 50g', 'Tempe goreng 50g', 'Nasi 100g', 'Bumbu pecel: kacang tanah, cabai, kencur, jeruk limau, gula aren'],
        steps: ['Rebus sayuran satu per satu: bayam, kacang panjang, tauge, kol. Tiriskan.', 'Buat sambal pecel: ulek kacang sangrai dengan cabai, kencur, jeruk limau, gula aren, garam.', 'Tata nasi, sayuran, dan tempe di piring.', 'Siram dengan sambal pecel. Tambahkan kerupuk emping jika suka.'],
        tip: 'Kencur adalah kunci rasa otentik sambal pecel. Jangan ganti dengan lengkuas — rasanya sangat berbeda.'
    },
    {
        id: 41, name: 'Chicken Teriyaki Bowl', meal: 'siang', type: 'balanced',
        emoji: '🍱', bg: 'linear-gradient(135deg, #D8C0A8, #C8B098)',
        desc: 'Ayam teriyaki homemade dengan nasi Jepang dan sayuran kukus. Saus teriyaki sehat tanpa MSG.',
        cal: 490, protein: 36, carbs: 52, fat: 12, fiber: 3, prep: '25 menit',
        ingredients: ['Paha ayam tanpa kulit 150g', 'Nasi putih 150g', 'Brokoli kukus 60g', 'Wortel kukus 40g', 'Kecap asin 2 sdm', 'Mirin 1 sdm', 'Madu 1 sdm', 'Bawang putih 1 siung', 'Jahe 1 cm', 'Wijen'],
        steps: ['Buat saus teriyaki: campur kecap asin, mirin, madu, bawang putih halus, jahe parut.', 'Panggang ayam di teflon hingga matang. Siram saus, masak hingga mengental dan caramelize.', 'Kukus brokoli dan wortel.', 'Tata nasi, ayam teriyaki iris, dan sayuran kukus di bowl. Taburi wijen.'],
        tip: 'Mirin bisa diganti campuran cuka beras 1 sdt + gula 1/2 sdt jika tidak tersedia.'
    },
    {
        id: 42, name: 'Sup Tomat & Roti Panggang', meal: 'siang', type: 'low-fat',
        emoji: '🍅', bg: 'linear-gradient(135deg, #E0A898, #D09888)',
        desc: 'Sup tomat creamy tanpa krim dengan roti gandum panggang. Comfort food rendah lemak yang menghangatkan.',
        cal: 320, protein: 12, carbs: 42, fat: 10, fiber: 6, prep: '25 menit',
        ingredients: ['Tomat matang 400g', 'Bawang bombay 1/2 buah', 'Bawang putih 2 siung', 'Kaldu sayur 200ml', 'Basil kering 1 sdt', 'Roti gandum 2 lembar', 'Minyak zaitun 1 sdm', 'Garam, lada, gula sedikit'],
        steps: ['Belah tomat, panggang bersama bawang bombay dan bawang putih di oven 200°C 20 menit.', 'Pindahkan ke panci, tambahkan kaldu, basil, garam, lada, gula.', 'Blender hingga halus. Panaskan kembali.', 'Panggang roti gandum, potong diagonal. Sajikan bersama sup.'],
        tip: 'Memanggang tomat sebelum di-blender memberikan rasa karamelisasi yang lebih dalam dan manis alami.'
    },
    {
        id: 43, name: 'Ayam Geprek Oven', meal: 'siang', type: 'high-protein',
        emoji: '🌶️', bg: 'linear-gradient(135deg, #E0B090, #D0A080)',
        desc: 'Ayam geprek versi oven — tidak digoreng deep fry tapi tetap crispy. Dengan sambal bawang pedas.',
        cal: 430, protein: 40, carbs: 30, fat: 14, fiber: 2, prep: '35 menit',
        ingredients: ['Dada ayam 180g', 'Tepung panko 40g', 'Telur 1 butir', 'Nasi putih 100g', 'Cabai rawit 10 buah', 'Bawang putih 3 siung', 'Tomat 1/2 buah', 'Garam, gula', 'Cooking spray'],
        steps: ['Pipihkan dada ayam. Celup ke telur kocok, balur tepung panko.', 'Letakkan di baking tray, spray minyak tipis. Panggang 200°C 20-25 menit, balik sekali.', 'Buat sambal: ulek cabai, bawang putih, tomat, garam, gula.', 'Geprek ayam, siram sambal. Sajikan dengan nasi.'],
        tip: 'Panko menghasilkan tekstur lebih crispy dari tepung roti biasa, bahkan tanpa deep fry.'
    },
    {
        id: 44, name: 'Salad Quinoa Mediterranean', meal: 'siang', type: 'vegetarian',
        emoji: '🫒', bg: 'linear-gradient(135deg, #C0C8A8, #B0B898)',
        desc: 'Salad quinoa ala Mediterania dengan chickpea, feta, zaitun, dan dressing lemon herb segar.',
        cal: 410, protein: 16, carbs: 44, fat: 20, fiber: 8, prep: '20 menit',
        ingredients: ['Quinoa 80g (kering)', 'Chickpea kalengan 60g', 'Timun 50g', 'Tomat cherry 6 buah', 'Zaitun hitam 6 buah', 'Feta 20g', 'Lemon 1/2', 'Minyak zaitun 1 sdm', 'Oregano, garam, lada'],
        steps: ['Masak quinoa sesuai petunjuk kemasan. Dinginkan.', 'Potong dadu timun, belah tomat cherry dan zaitun.', 'Campur semua bahan di mangkuk besar.', 'Dressing: minyak zaitun + lemon + oregano + garam + lada. Siram dan aduk rata.'],
        tip: 'Quinoa mengandung semua 9 asam amino esensial — salah satu biji-bijian paling komplit nutrisinya.'
    },
    {
        id: 45, name: 'Rawon Daging Sapi', meal: 'siang', type: 'high-protein',
        emoji: '🥩', bg: 'linear-gradient(135deg, #584838, #483828)',
        desc: 'Rawon khas Surabaya dengan kuah hitam dari kluwek. Kaya protein dan memiliki rasa yang unik.',
        cal: 460, protein: 38, carbs: 35, fat: 18, fiber: 3, prep: '120 menit',
        ingredients: ['Daging sapi 150g', 'Kluwek 3 buah', 'Nasi putih 100g', 'Tauge pendek 30g', 'Telur asin 1/2', 'Bumbu: bawang merah, bawang putih, lengkuas, kunyit, cabai', 'Daun jeruk, serai'],
        steps: ['Rebus daging hingga empuk (60-90 menit). Potong dadu.', 'Haluskan bumbu bersama isi kluwek. Tumis hingga harum.', 'Masukkan bumbu ke kaldu daging. Tambahkan daun jeruk dan serai.', 'Masak 30 menit hingga kuah berwarna hitam pekat.', 'Sajikan rawon dengan nasi, tauge, dan telur asin.'],
        tip: 'Kluwek harus matang sempurna (dagingnya hitam dan lembut). Kluwek mentah mengandung racun, jadi beli yang sudah diproses.'
    },
    {
        id: 46, name: 'Nasi Liwet Solo', meal: 'siang', type: 'balanced',
        emoji: '🍛', bg: 'linear-gradient(135deg, #E0D0B0, #D0C0A0)',
        desc: 'Nasi liwet gurih khas Solo dengan lauk ayam suwir, telur pindang, dan lalapan. Comfort food yang seimbang.',
        cal: 480, protein: 24, carbs: 55, fat: 16, fiber: 3, prep: '40 menit',
        ingredients: ['Beras 120g', 'Santan encer 200ml', 'Dada ayam 80g', 'Telur 1 butir', 'Daun salam, serai, lengkuas', 'Pete 3 butir (opsional)', 'Timun, kemangi', 'Garam'],
        steps: ['Masak beras dengan santan, daun salam, serai, lengkuas, dan garam hingga matang.', 'Rebus ayam, suwir halus. Tumis dengan sedikit bumbu.', 'Rebus telur, belah dua.', 'Sajikan nasi liwet dengan ayam suwir, telur, pete, timun, dan kemangi.'],
        tip: 'Masak nasi liwet di rice cooker dengan santan untuk versi praktis — hasilnya sama gurihnya.'
    },
    {
        id: 47, name: 'Lettuce Wrap Daging', meal: 'siang', type: 'low-carb',
        emoji: '🥬', bg: 'linear-gradient(135deg, #A8C898, #98B888)',
        desc: 'Daging cincang tumis berbumbu dibungkus selada hijau segar. Rendah karbo, tinggi protein, sangat mengenyangkan.',
        cal: 340, protein: 30, carbs: 12, fat: 20, fiber: 3, prep: '15 menit',
        ingredients: ['Daging sapi cincang 150g', 'Selada iceberg 4 lembar besar', 'Bawang putih 2 siung', 'Bawang bombay 1/4', 'Wortel parut 30g', 'Kecap asin 1 sdm', 'Saus tiram 1/2 sdm', 'Cabai (opsional)', 'Wijen'],
        steps: ['Tumis bawang putih dan bombay cincang.', 'Masukkan daging cincang, masak hingga berubah warna.', 'Tambahkan wortel parut, kecap asin, saus tiram. Aduk rata.', 'Ambil daun selada, isi dengan daging tumis. Taburi wijen.', 'Makan seperti taco — fresh dan rendah karbo!'],
        tip: 'Keringkan daun selada dengan spinner salad agar wrap tidak basah. Iceberg lebih cocok dari romaine karena lebih renyah.'
    },
    {
        id: 48, name: 'Mie Ayam Sehat', meal: 'siang', type: 'balanced',
        emoji: '🍜', bg: 'linear-gradient(135deg, #E0C8A0, #D0B890)',
        desc: 'Mie ayam dengan mie telur gandum, ayam cincang, dan sayuran. Versi sehat dari jajanan favorit.',
        cal: 430, protein: 28, carbs: 48, fat: 14, fiber: 4, prep: '20 menit',
        ingredients: ['Mie telur/gandum 80g', 'Dada ayam cincang 100g', 'Sawi hijau 50g', 'Bawang putih 2 siung', 'Kecap manis 1 sdm', 'Kecap asin 1/2 sdm', 'Minyak wijen 1 sdt', 'Kaldu ayam untuk kuah', 'Daun bawang'],
        steps: ['Rebus mie hingga al dente, tiriskan.', 'Tumis bawang putih, masukkan ayam cincang. Masak hingga matang.', 'Tambahkan kecap manis, kecap asin, dan minyak wijen.', 'Rebus sawi hijau sebentar.', 'Tata mie di mangkuk, topping ayam dan sawi. Sajikan dengan kuah kaldu di samping.'],
        tip: 'Pilih mie telur atau mie gandum utuh — lebih berserat dari mie tepung biasa.'
    },
    {
        id: 49, name: 'Soto Ayam Bening', meal: 'siang', type: 'low-fat',
        emoji: '🍵', bg: 'linear-gradient(135deg, #E8E0B8, #D8D0A8)',
        desc: 'Soto ayam bening dengan kuah kuning segar, tauge, dan telur rebus. Rendah lemak tapi penuh rasa.',
        cal: 350, protein: 30, carbs: 32, fat: 10, fiber: 3, prep: '40 menit',
        ingredients: ['Ayam (paha tanpa kulit) 150g', 'Nasi 80g / bihun 50g', 'Tauge 40g', 'Telur rebus 1', 'Seledri, daun bawang', 'Bumbu: kunyit, bawang merah, bawang putih, jahe, lengkuas', 'Daun salam, serai', 'Jeruk nipis'],
        steps: ['Rebus ayam hingga matang, suwir. Saring kaldu.', 'Haluskan bumbu kuning, tumis hingga harum.', 'Masukkan bumbu ke kaldu, tambahkan daun salam dan serai.', 'Masak 15 menit hingga kuah kuning.', 'Sajikan: nasi/bihun, ayam suwir, tauge, telur, seledri, perasan jeruk nipis.'],
        tip: 'Perasan jeruk nipis saat penyajian adalah kunci kesegaran soto — jangan skip!'
    },
    {
        id: 50, name: 'Zucchini Noodle Bolognese', meal: 'siang', type: 'low-carb',
        emoji: '🍝', bg: 'linear-gradient(135deg, #D0A890, #C09880)',
        desc: 'Spaghetti bolognese rendah karbo dengan zucchini noodle. Semua rasa pasta tanpa karbohidrat berlebih.',
        cal: 350, protein: 28, carbs: 16, fat: 18, fiber: 5, prep: '20 menit',
        ingredients: ['Zucchini 2 buah (spiralize)', 'Daging sapi cincang 120g', 'Saus tomat 100g', 'Bawang bombay 1/2', 'Bawang putih 2 siung', 'Oregano 1/2 sdt', 'Basil kering 1/2 sdt', 'Minyak zaitun 1 sdt', 'Parmesan 1 sdm'],
        steps: ['Spiralize zucchini menjadi noodle. Taburi garam, diamkan 10 menit, peras airnya.', 'Tumis bawang bombay dan bawang putih. Masukkan daging cincang, masak hingga berubah warna.', 'Tambahkan saus tomat, oregano, basil. Masak 10 menit.', 'Tumis zoodle di wajan terpisah 2-3 menit (jangan terlalu lama).', 'Sajikan zoodle dengan bolognese sauce, taburi parmesan.'],
        tip: 'Jangan terlalu lama memasak zucchini noodle — cukup 2 menit agar tetap al dente dan tidak berair.'
    },
    {
        id: 51, name: 'Nasi Campur Bali', meal: 'siang', type: 'balanced',
        emoji: '🍛', bg: 'linear-gradient(135deg, #D8B898, #C8A888)',
        desc: 'Nasi campur khas Bali dengan ayam betutu, lawar, sambal matah, dan sate lilit. Lengkap dan kaya rempah.',
        cal: 520, protein: 32, carbs: 48, fat: 20, fiber: 4, prep: '45 menit',
        ingredients: ['Nasi putih 120g', 'Ayam (paha) 100g', 'Kacang panjang 40g', 'Kelapa parut 30g', 'Bawang merah 5 butir', 'Serai 2 batang', 'Cabai, bawang putih, kunyit, jahe', 'Jeruk limau, minyak kelapa'],
        steps: ['Bumbu betutu: haluskan semua rempah. Lumuri ayam, kukus 30-40 menit.', 'Lawar: campur kacang panjang iris, kelapa parut, dan bumbu halus.', 'Sambal matah: iris halus bawang merah dan serai, campur dengan minyak, garam, jeruk limau.', 'Sajikan nasi dengan ayam betutu suwir, lawar, dan sambal matah.'],
        tip: 'Sambal matah paling enak saat baru dibuat (fresh) — jangan simpan terlalu lama karena serai akan pahit.'
    },
    // ===== MAKAN MALAM TAMBAHAN (52-71) =====
    {
        id: 52, name: 'Capcay Seafood', meal: 'malam', type: 'low-carb',
        emoji: '🦐', bg: 'linear-gradient(135deg, #B8C8D0, #A8B8C0)',
        desc: 'Capcay warna-warni dengan udang, cumi, dan aneka sayuran. Rendah karbo dan kaya protein laut.',
        cal: 300, protein: 28, carbs: 18, fat: 14, fiber: 5, prep: '20 menit',
        ingredients: ['Udang 80g', 'Cumi 60g', 'Brokoli 60g', 'Wortel 40g', 'Baby corn 40g', 'Sawi putih 40g', 'Bawang putih 2 siung', 'Saus tiram 1 sdm', 'Tepung maizena 1 sdt + air'],
        steps: ['Bersihkan udang dan cumi. Potong-potong.', 'Tumis bawang putih, masukkan seafood. Masak hingga berubah warna.', 'Tambahkan sayuran dari yang paling keras (wortel) ke paling lunak.', 'Bumbui dengan saus tiram, garam. Kentalkan dengan larutan maizena.', 'Sajikan hangat tanpa nasi atau dengan sedikit nasi merah.'],
        tip: 'Masak seafood jangan terlalu lama — udang hanya perlu 2-3 menit, cumi 1-2 menit. Overcooked = alot.'
    },
    {
        id: 53, name: 'Ayam Bakar Madu Jahe', meal: 'malam', type: 'balanced',
        emoji: '🍯', bg: 'linear-gradient(135deg, #E0C090, #D0B080)',
        desc: 'Paha ayam bakar dengan glaze madu jahe yang caramelized. Disajikan dengan sayur kukus.',
        cal: 420, protein: 36, carbs: 28, fat: 16, fiber: 3, prep: '35 menit',
        ingredients: ['Paha ayam tanpa kulit 180g', 'Madu 2 sdm', 'Jahe parut 1 sdm', 'Kecap asin 1 sdm', 'Bawang putih 2 siung halus', 'Brokoli kukus 80g', 'Wortel kukus 60g', 'Lada hitam'],
        steps: ['Campur madu, jahe, kecap asin, bawang putih, lada hitam untuk marinade.', 'Lumuri ayam, diamkan minimal 30 menit (idealnya 2 jam di kulkas).', 'Panggang ayam di oven 200°C 25-30 menit, olesi sisa marinade setiap 10 menit.', 'Kukus brokoli dan wortel.', 'Sajikan ayam bakar dengan sayur kukus.'],
        tip: 'Olesi marinade berulang kali saat memanggang untuk lapisan glaze yang tebal dan shiny.'
    },
    {
        id: 54, name: 'Pepes Ikan Bumbu Kuning', meal: 'malam', type: 'low-fat',
        emoji: '🐠', bg: 'linear-gradient(135deg, #C8D0B0, #B8C0A0)',
        desc: 'Ikan dibungkus daun pisang dengan bumbu kuning dan kemangi. Dimasak kukus tanpa minyak — sangat rendah lemak.',
        cal: 260, protein: 32, carbs: 8, fat: 10, fiber: 2, prep: '35 menit',
        ingredients: ['Ikan mas/nila 200g', 'Daun pisang', 'Kemangi 1 genggam', 'Tomat 1 buah iris', 'Bumbu halus: kunyit, bawang merah, bawang putih, cabai, kemiri', 'Daun salam, serai'],
        steps: ['Haluskan bumbu kuning. Lumuri ikan rata.', 'Siapkan daun pisang, letakkan ikan yang sudah dibumbu.', 'Tambahkan irisan tomat, kemangi, daun salam, serai.', 'Bungkus rapat, sematkan dengan lidi.', 'Kukus 25-30 menit hingga matang. Sajikan dalam bungkusnya.'],
        tip: 'Pepes dikukus lebih sehat dari dipanggang — tidak ada minyak tambahan dan nutrisi ikan lebih terjaga.'
    },
    {
        id: 55, name: 'Stir-Fry Udang Brokoli', meal: 'malam', type: 'high-protein',
        emoji: '🦐', bg: 'linear-gradient(135deg, #D0C0A8, #C0B098)',
        desc: 'Tumis udang besar dengan brokoli dan saus bawang putih. Cepat, sehat, dan kaya protein.',
        cal: 320, protein: 34, carbs: 14, fat: 14, fiber: 4, prep: '15 menit',
        ingredients: ['Udang ukuran besar 200g', 'Brokoli 120g', 'Bawang putih 3 siung iris', 'Saus tiram 1 sdm', 'Kecap asin 1/2 sdm', 'Minyak zaitun 1 sdm', 'Cabai kering 2 buah (opsional)', 'Lada putih'],
        steps: ['Bersihkan udang, buang kulit tapi sisakan ekor.', 'Panaskan minyak zaitun, tumis bawang putih dan cabai kering hingga harum.', 'Masukkan udang, masak 2 menit per sisi.', 'Tambahkan brokoli, saus tiram, kecap asin, lada. Tumis 2-3 menit.', 'Sajikan segera selagi panas.'],
        tip: 'Udang matang saat berubah warna pink dan melengkung — jangan masak lebih dari itu!'
    },
    {
        id: 56, name: 'Sayur Asem Betawi', meal: 'malam', type: 'vegetarian',
        emoji: '🌽', bg: 'linear-gradient(135deg, #C8D0A8, #B8C098)',
        desc: 'Sayur asem segar dengan kuah asam manis alami dari asam jawa. Penuh sayuran dan sangat rendah kalori.',
        cal: 180, protein: 8, carbs: 30, fat: 4, fiber: 7, prep: '30 menit',
        ingredients: ['Jagung manis 1 buah', 'Kacang tanah 30g', 'Labu siam 80g', 'Kacang panjang 50g', 'Melinjo 20g', 'Asam jawa 1 sdm', 'Gula aren 1 sdm', 'Cabai hijau, bawang merah', 'Garam'],
        steps: ['Rebus kacang tanah dan melinjo hingga empuk (mereka paling lama).', 'Masukkan jagung potong dan labu siam.', 'Tambahkan kacang panjang, cabai hijau, bawang merah iris.', 'Larutkan asam jawa dengan air. Masukkan ke kuah bersama gula aren dan garam.', 'Masak 5 menit lagi. Sajikan hangat.'],
        tip: 'Sayur asem lebih enak dimakan keesokan harinya setelah bumbu meresap — buat lebih untuk besok!'
    },
    {
        id: 57, name: 'Daging Rendang Slow Cook', meal: 'malam', type: 'high-protein',
        emoji: '🥘', bg: 'linear-gradient(135deg, #8B6B4B, #7B5B3B)',
        desc: 'Rendang empuk yang dimasak perlahan dengan rempah lengkap. Porsi terkontrol untuk tetap dalam batas kalori.',
        cal: 450, protein: 36, carbs: 12, fat: 28, fiber: 2, prep: '120 menit',
        ingredients: ['Daging sapi 150g potong', 'Santan 200ml', 'Serai 2 batang', 'Daun jeruk 4 lembar', 'Daun kunyit 1 lembar', 'Bumbu halus: cabai, bawang merah, bawang putih, jahe, lengkuas, kunyit, kemiri'],
        steps: ['Tumis bumbu halus hingga harum dan berminyak.', 'Masukkan daging, aduk hingga berubah warna.', 'Tuang santan, tambahkan serai, daun jeruk, daun kunyit.', 'Masak api kecil 2 jam hingga santan mengering dan daging empuk.', 'Aduk sesekali agar tidak lengket. Sajikan dengan nasi merah 80g.'],
        tip: 'Rendang semakin enak jika dimasak ulang. Simpan di kulkas dan panaskan — rasa rempah semakin meresap.'
    },
    {
        id: 58, name: 'Omelet Bayam Keju', meal: 'malam', type: 'low-carb',
        emoji: '🧀', bg: 'linear-gradient(135deg, #E0D0A8, #D0C098)',
        desc: 'Omelet tebal dengan isian bayam tumis dan keju mozzarella. Makan malam cepat dan rendah karbo.',
        cal: 320, protein: 26, carbs: 6, fat: 22, fiber: 2, prep: '12 menit',
        ingredients: ['Telur 3 butir', 'Bayam segar 40g', 'Keju mozzarella 30g', 'Bawang putih 1 siung', 'Tomat cherry 4 buah', 'Butter 1 sdt', 'Garam, lada, oregano'],
        steps: ['Tumis bawang putih dan bayam hingga layu. Sisihkan.', 'Kocok telur dengan garam, lada, oregano.', 'Panaskan butter di teflon, tuang telur. Masak api kecil.', 'Saat setengah matang, isi dengan bayam, keju, tomat cherry belah.', 'Lipat, masak 1 menit lagi. Sajikan.'],
        tip: 'Api kecil adalah kunci omelet lembut — jangan terburu-buru. Omelet yang baik butuh kesabaran.'
    },
    {
        id: 59, name: 'Sop Kambing Light', meal: 'malam', type: 'high-protein',
        emoji: '🐑', bg: 'linear-gradient(135deg, #D0B898, #C0A888)',
        desc: 'Sop kambing bening dengan rempah lengkap. Rendah lemak karena menggunakan daging tanpa lemak.',
        cal: 380, protein: 34, carbs: 24, fat: 16, fiber: 3, prep: '60 menit',
        ingredients: ['Daging kambing tanpa lemak 150g', 'Wortel 1 buah', 'Kentang 1 buah', 'Tomat 1 buah', 'Bawang bombay 1/2', 'Seledri, daun bawang', 'Pala, cengkeh, kayu manis, lada', 'Jahe 3 cm', 'Bawang goreng'],
        steps: ['Rebus daging kambing dengan jahe geprek hingga empuk (45-60 menit). Buang lemak permukaan.', 'Tumis bawang bombay, masukkan ke kaldu.', 'Tambahkan wortel, kentang, tomat, dan rempah.', 'Masak 15 menit hingga sayuran empuk.', 'Sajikan dengan taburan bawang goreng, seledri, dan daun bawang.'],
        tip: 'Rendam daging kambing dalam air jeruk nipis 15 menit sebelum dimasak untuk mengurangi bau prengus.'
    },
    {
        id: 60, name: 'Terong Balado', meal: 'malam', type: 'vegetarian',
        emoji: '🍆', bg: 'linear-gradient(135deg, #B8A0C0, #A890B0)',
        desc: 'Terong ungu panggang oven dengan sambal balado merah. Rendah kalori, tinggi serat, dan sangat flavorful.',
        cal: 200, protein: 6, carbs: 22, fat: 10, fiber: 6, prep: '25 menit',
        ingredients: ['Terong ungu 2 buah', 'Cabai merah 8 buah', 'Cabai keriting 4 buah', 'Bawang merah 5 butir', 'Bawang putih 3 siung', 'Tomat 1 buah', 'Gula, garam, jeruk limau', 'Minyak 1 sdm'],
        steps: ['Belah terong, panggang di oven 200°C selama 15 menit hingga empuk.', 'Goreng cabai, bawang merah, bawang putih, tomat sebentar. Angkat.', 'Ulek kasar semua bahan sambal. Bumbui gula, garam, jeruk limau.', 'Tumis sambal sebentar hingga harum.', 'Sajikan terong panggang dengan sambal balado.'],
        tip: 'Panggang terong di oven lebih sehat dari menggoreng — hemat minyak 90% dan teksturnya lebih lembut.'
    },
    {
        id: 61, name: 'Tumis Kangkung Terasi', meal: 'malam', type: 'low-fat',
        emoji: '🥬', bg: 'linear-gradient(135deg, #98B888, #88A878)',
        desc: 'Tumis kangkung api besar dengan terasi dan cabai. Side dish klasik yang kaya zat besi.',
        cal: 120, protein: 6, carbs: 10, fat: 6, fiber: 4, prep: '10 menit',
        ingredients: ['Kangkung 200g', 'Terasi 1/2 sdt', 'Cabai rawit 5 buah', 'Bawang merah 3 butir', 'Bawang putih 2 siung', 'Tomat 1/2 buah', 'Gula, garam', 'Minyak 1 sdt'],
        steps: ['Petik daun kangkung, cuci bersih.', 'Iris bawang merah, bawang putih, cabai. Geprek terasi.', 'Panaskan minyak api besar, tumis bumbu dan terasi hingga harum.', 'Masukkan kangkung, aduk cepat. Tambahkan tomat iris.', 'Bumbui garam dan gula. Masak 2-3 menit saja agar tetap hijau.'],
        tip: 'Tumis kangkung HARUS api besar dan cepat — itulah rahasia kangkung restoran yang hijau dan renyah.'
    },
    {
        id: 62, name: 'Chicken Lettuce Cup', meal: 'malam', type: 'low-carb',
        emoji: '🥬', bg: 'linear-gradient(135deg, #B8C8A0, #A8B890)',
        desc: 'Ayam cincang tumis ala Asia dalam mangkuk selada. Segar, ringan, dan tanpa karbohidrat.',
        cal: 280, protein: 30, carbs: 10, fat: 14, fiber: 3, prep: '15 menit',
        ingredients: ['Dada ayam cincang 150g', 'Selada butter 6 lembar', 'Kastanye air 30g (opsional)', 'Wortel parut 30g', 'Bawang putih 2 siung', 'Kecap asin 1 sdm', 'Saus hoisin 1 sdm', 'Jahe parut 1 sdt', 'Wijen, daun bawang'],
        steps: ['Tumis bawang putih dan jahe.', 'Masukkan ayam cincang, masak hingga matang.', 'Tambahkan wortel, kastanye, kecap asin, saus hoisin.', 'Aduk rata 2 menit.', 'Sendokkan ke daun selada butter. Taburi wijen dan daun bawang.'],
        tip: 'Selada butter (butterhead) lebih fleksibel dari iceberg — tidak mudah patah saat dijadikan cup.'
    },
    {
        id: 63, name: 'Sup Krim Brokoli Sehat', meal: 'malam', type: 'vegetarian',
        emoji: '🥦', bg: 'linear-gradient(135deg, #A8C090, #98B080)',
        desc: 'Sup krim brokoli tanpa krim susu — menggunakan kentang sebagai pengental alami. Creamy dan velvety.',
        cal: 220, protein: 10, carbs: 28, fat: 8, fiber: 6, prep: '25 menit',
        ingredients: ['Brokoli 250g', 'Kentang 1 buah kecil', 'Bawang bombay 1/2', 'Bawang putih 2 siung', 'Kaldu sayur 400ml', 'Susu rendah lemak 100ml', 'Minyak zaitun 1 sdm', 'Garam, lada, pala'],
        steps: ['Tumis bawang bombay dan bawang putih dengan minyak zaitun.', 'Masukkan brokoli dan kentang potong. Tuang kaldu.', 'Masak 15 menit hingga empuk.', 'Blender hingga halus. Kembali ke panci.', 'Tambahkan susu, bumbui garam, lada, pala. Panaskan sebentar.'],
        tip: 'Kentang adalah pengganti krim alami yang brilian — memberi tekstur creamy tanpa lemak tambahan.'
    },
    {
        id: 64, name: 'Ikan Gurame Asam Manis', meal: 'malam', type: 'balanced',
        emoji: '🐟', bg: 'linear-gradient(135deg, #E0C0A0, #D0B090)',
        desc: 'Ikan gurame dengan saus asam manis segar dari nanas dan paprika. Bukan versi deep fry.',
        cal: 380, protein: 34, carbs: 28, fat: 12, fiber: 3, prep: '30 menit',
        ingredients: ['Ikan gurame fillet 200g', 'Nanas 80g potong', 'Paprika merah 1/2', 'Paprika hijau 1/2', 'Bawang bombay 1/2', 'Saus tomat 2 sdm', 'Cuka 1 sdm', 'Gula 1 sdm', 'Tepung maizena 1 sdt', 'Minyak 1 sdm'],
        steps: ['Bumbui ikan dengan garam dan lada. Panggang di teflon dengan sedikit minyak.', 'Tumis bawang bombay, masukkan paprika dan nanas.', 'Buat saus: campur saus tomat, cuka, gula, dan larutan maizena.', 'Tuang ke tumisan, masak hingga mengental.', 'Sajikan ikan dengan saus asam manis di atasnya.'],
        tip: 'Nanas segar mengandung enzim bromelain yang membantu mencerna protein — pendamping ideal untuk ikan.'
    },
    {
        id: 65, name: 'Nasi Tim Ayam Jamur', meal: 'malam', type: 'low-fat',
        emoji: '🍚', bg: 'linear-gradient(135deg, #D8D0C0, #C8C0B0)',
        desc: 'Nasi tim lembut dengan ayam dan jamur shiitake. Mudah dicerna dan cocok untuk makan malam ringan.',
        cal: 340, protein: 22, carbs: 45, fat: 8, fiber: 2, prep: '40 menit',
        ingredients: ['Beras 80g', 'Dada ayam 80g', 'Jamur shiitake kering 3 buah (rendam)', 'Daun bawang 1 batang', 'Jahe 1 cm', 'Kecap asin 1 sdt', 'Minyak wijen 1/2 sdt', 'Kaldu ayam 250ml', 'Garam, lada putih'],
        steps: ['Rendam beras 30 menit. Rendam jamur shiitake.', 'Iris ayam tipis, marinasi dengan kecap asin, minyak wijen, lada.', 'Letakkan beras di mangkuk tahan panas, tambahkan kaldu.', 'Tata ayam, jamur iris, dan jahe di atas beras.', 'Kukus 30-35 menit hingga nasi matang. Taburi daun bawang.'],
        tip: 'Nasi tim dikukus, bukan direbus — hasilnya lebih lembut dan pulen karena uap air merata.'
    },
    {
        id: 66, name: 'Tahu Telur Surabaya', meal: 'malam', type: 'vegetarian',
        emoji: '🥜', bg: 'linear-gradient(135deg, #D0C0A0, #C0B090)',
        desc: 'Tahu telur khas Surabaya dengan saus kacang dan petis. Street food yang bisa dibuat sehat di rumah.',
        cal: 350, protein: 22, carbs: 28, fat: 18, fiber: 4, prep: '20 menit',
        ingredients: ['Tahu putih 200g', 'Telur 2 butir', 'Tauge 50g', 'Kacang tanah 30g', 'Petis udang 1 sdm', 'Bawang putih 2 siung', 'Cabai rawit 3 buah', 'Kecap manis 1 sdm', 'Daun bawang'],
        steps: ['Hancurkan tahu kasar, campurkan dengan telur kocok dan garam.', 'Dadar campuran tahu-telur di teflon hingga kecoklatan kedua sisi.', 'Rebus tauge sebentar.', 'Buat saus: haluskan kacang, bawang putih, cabai. Campur dengan petis, kecap manis, air.', 'Potong tahu telur, tata dengan tauge. Siram saus kacang.'],
        tip: 'Petis adalah kunci rasa otentik tahu telur Surabaya — umami yang tidak bisa digantikan bumbu lain.'
    },
    {
        id: 67, name: 'Dada Ayam Lemon Herb', meal: 'malam', type: 'high-protein',
        emoji: '🍋', bg: 'linear-gradient(135deg, #E8E0A8, #D8D098)',
        desc: 'Dada ayam panggang dengan bumbu lemon, rosemary, dan thyme. Simple, clean, dan sangat tinggi protein.',
        cal: 300, protein: 42, carbs: 6, fat: 12, fiber: 2, prep: '25 menit',
        ingredients: ['Dada ayam 200g', 'Lemon 1 buah', 'Rosemary segar 1 tangkai', 'Thyme kering 1/2 sdt', 'Bawang putih 3 siung', 'Minyak zaitun 1 sdm', 'Garam, lada hitam', 'Asparagus 80g (pelengkap)'],
        steps: ['Marinasi ayam dengan perasan lemon, zest lemon, rosemary, thyme, bawang putih halus, minyak zaitun, garam, lada. Min 30 menit.', 'Panggang di oven 200°C selama 20-25 menit.', 'Istirahatkan 5 menit sebelum dipotong.', 'Panggang asparagus bersamaan di 10 menit terakhir.', 'Sajikan dengan irisan lemon segar.'],
        tip: 'REST the chicken! Diamkan 5 menit setelah dipanggang agar jus merata kembali — hasilnya jauh lebih juicy.'
    },
    {
        id: 68, name: 'Urap Sayuran', meal: 'malam', type: 'vegetarian',
        emoji: '🥥', bg: 'linear-gradient(135deg, #B0C0A0, #A0B090)',
        desc: 'Aneka sayuran rebus dengan bumbu kelapa parut khas Jawa. Kaya serat dan penuh cita rasa tradisional.',
        cal: 240, protein: 10, carbs: 24, fat: 12, fiber: 8, prep: '25 menit',
        ingredients: ['Bayam 50g', 'Kacang panjang 50g', 'Tauge 40g', 'Kelapa parut 60g', 'Cabai rawit 3 buah', 'Bawang putih 2 siung', 'Kencur 1 cm', 'Daun jeruk 2 lembar', 'Gula, garam, jeruk limau'],
        steps: ['Rebus sayuran satu per satu hingga matang. Tiriskan.', 'Sangrai kelapa parut di wajan kering hingga sedikit kecoklatan.', 'Haluskan cabai, bawang putih, kencur, garam, gula.', 'Campur bumbu halus dengan kelapa sangrai dan daun jeruk iris.', 'Aduk rata sayuran dengan bumbu kelapa.'],
        tip: 'Menyangrai kelapa parut memberikan aroma nutty dan mencegah urap cepat basi — bisa tahan 2 hari di kulkas.'
    },
    {
        id: 69, name: 'Kwetiau Goreng Seafood', meal: 'malam', type: 'balanced',
        emoji: '🍜', bg: 'linear-gradient(135deg, #D8C8B0, #C8B8A0)',
        desc: 'Kwetiau goreng dengan udang dan cumi, sayuran segar, dan bumbu sederhana. Comfort food malam hari.',
        cal: 420, protein: 26, carbs: 44, fat: 16, fiber: 3, prep: '20 menit',
        ingredients: ['Kwetiau basah 150g', 'Udang 60g', 'Cumi 40g', 'Sawi hijau 50g', 'Tauge 30g', 'Telur 1 butir', 'Bawang putih 2 siung', 'Kecap manis 1 sdm', 'Kecap asin 1/2 sdm'],
        steps: ['Tumis bawang putih, masukkan udang dan cumi. Masak hingga berubah warna.', 'Sisihkan ke pinggir wajan. Masukkan telur, orak-arik.', 'Masukkan kwetiau, aduk rata.', 'Tambahkan sawi dan tauge. Bumbui kecap manis, kecap asin.', 'Tumis api besar 2-3 menit. Sajikan.'],
        tip: 'Api besar (wok hei) adalah rahasia kwetiau goreng yang smoky dan tidak lembek — jangan ragu panaskan wajan sangat panas.'
    },
    {
        id: 70, name: 'Sup Labu Butternut', meal: 'malam', type: 'low-fat',
        emoji: '🎃', bg: 'linear-gradient(135deg, #E0C090, #D0B080)',
        desc: 'Sup labu butternut yang creamy dan manis alami. Comfort food musim dingin yang rendah lemak.',
        cal: 200, protein: 6, carbs: 34, fat: 6, fiber: 5, prep: '30 menit',
        ingredients: ['Labu butternut/kuning 300g', 'Bawang bombay 1/2', 'Bawang putih 2 siung', 'Kaldu sayur 300ml', 'Kayu manis 1/4 sdt', 'Pala sedikit', 'Minyak zaitun 1 sdt', 'Garam, lada'],
        steps: ['Potong labu, panggang di oven 200°C 20 menit bersama bawang bombay dan bawang putih.', 'Pindahkan ke panci, tambahkan kaldu.', 'Blender hingga halus.', 'Bumbui dengan kayu manis, pala, garam, lada.', 'Sajikan hangat dengan sedikit drizzle minyak zaitun.'],
        tip: 'Memanggang labu terlebih dahulu mengkaramelisasi gula alami dan memberi rasa 10x lebih manis.'
    },
    {
        id: 71, name: 'Sate Ayam Tanpa Bumbu Kacang', meal: 'malam', type: 'high-protein',
        emoji: '🍢', bg: 'linear-gradient(135deg, #D8B898, #C8A888)',
        desc: 'Sate ayam dengan bumbu kecap manis tanpa bumbu kacang. Lebih rendah kalori tapi tetap juicy.',
        cal: 340, protein: 36, carbs: 18, fat: 14, fiber: 1, prep: '30 menit',
        ingredients: ['Paha ayam tanpa kulit 200g', 'Kecap manis 2 sdm', 'Bawang merah 3 butir halus', 'Bawang putih 2 siung halus', 'Air jeruk nipis 1 sdm', 'Garam, lada', 'Tusuk sate 10 buah', 'Bawang merah iris goreng', 'Acar timun'],
        steps: ['Potong ayam dadu 2cm. Marinasi dengan kecap manis, bawang halus, jeruk nipis, garam, lada. Min 30 menit.', 'Tusuk ayam ke tusuk sate (4-5 potong per tusuk).', 'Panggang di griller/teflon, bolak-balik sambil olesi sisa marinade.', 'Masak hingga caramelized dan matang.', 'Sajikan dengan bawang goreng dan acar timun.'],
        tip: 'Rendam tusuk sate bambu dalam air 30 menit sebelumnya agar tidak terbakar saat dipanggang.'
    },
    // ===== SNACK TAMBAHAN (72-91) =====
    {
        id: 72, name: 'Pisang Beku Coklat', meal: 'snack', type: 'balanced',
        emoji: '🍌', bg: 'linear-gradient(135deg, #E8D090, #D8C080)',
        desc: 'Pisang beku dicelup dark chocolate dan topping kacang. Dessert sehat pengganti es krim.',
        cal: 200, protein: 4, carbs: 30, fat: 8, fiber: 3, prep: '10 menit + beku',
        ingredients: ['Pisang 2 buah', 'Dark chocolate 30g', 'Kacang almond cincang 1 sdm', 'Tusuk es krim/stik'],
        steps: ['Potong pisang jadi 2. Tusuk dengan stik.', 'Lelehkan dark chocolate (microwave/double boiler).', 'Celupkan pisang ke coklat, gulingkan di kacang almond.', 'Letakkan di baking paper. Bekukan min 2 jam.'],
        tip: 'Gunakan dark chocolate min 70% cocoa — lebih rendah gula dan kaya antioksidan flavonoid.'
    },
    {
        id: 73, name: 'Trail Mix Homemade', meal: 'snack', type: 'high-protein',
        emoji: '🥜', bg: 'linear-gradient(135deg, #C8B090, #B8A080)',
        desc: 'Campuran kacang-kacangan, biji-bijian, dan dried fruit. Portable snack berenergi tinggi.',
        cal: 250, protein: 10, carbs: 20, fat: 16, fiber: 4, prep: '5 menit',
        ingredients: ['Almond 15g', 'Kacang mete 10g', 'Walnut 10g', 'Pumpkin seed 10g', 'Cranberry kering 10g', 'Dark choco chips 10g'],
        steps: ['Campur semua bahan di mangkuk.', 'Bagi ke wadah-wadah kecil untuk porsi terkontrol.', 'Simpan di wadah kedap udara. Tahan 2 minggu.'],
        tip: 'Porsi sangat penting untuk trail mix — selalu takar dulu, jangan makan langsung dari toples besar!'
    },
    {
        id: 74, name: 'Apel & Selai Kacang', meal: 'snack', type: 'balanced',
        emoji: '🍎', bg: 'linear-gradient(135deg, #D8B8B0, #C8A8A0)',
        desc: 'Irisan apel dengan celupan selai kacang alami. Kombinasi manis-gurih yang sederhana tapi adiktif.',
        cal: 190, protein: 6, carbs: 24, fat: 8, fiber: 4, prep: '3 menit',
        ingredients: ['Apel 1 buah', 'Selai kacang alami 1 sdm', 'Kayu manis bubuk sedikit'],
        steps: ['Cuci dan iris apel jadi 8 bagian. Buang biji.', 'Taburkan sedikit kayu manis.', 'Celupkan ke selai kacang dan nikmati.'],
        tip: 'Apel hijau (Granny Smith) lebih rendah gula dari apel merah dan cocok dipadukan selai kacang.'
    },
    {
        id: 75, name: 'Protein Mug Cake', meal: 'snack', type: 'high-protein',
        emoji: '🧁', bg: 'linear-gradient(135deg, #C8A890, #B89880)',
        desc: 'Cake coklat protein yang dimasak 2 menit di microwave. Lembut, chocolatey, dan mengenyangkan.',
        cal: 220, protein: 24, carbs: 18, fat: 6, fiber: 3, prep: '5 menit',
        ingredients: ['Whey protein coklat 1 scoop', 'Pisang 1/2 buah (haluskan)', 'Telur 1 butir', 'Cocoa powder 1 sdm', 'Baking powder 1/4 sdt', 'Susu almond 2 sdm'],
        steps: ['Haluskan pisang di mug.', 'Tambahkan telur, whey, cocoa, baking powder, susu. Aduk rata.', 'Microwave 90 detik (atau hingga set).', 'Diamkan 1 menit. Balik ke piring jika mau.'],
        tip: 'Jangan over-microwave — cake akan jadi kering. Mulai dari 60 detik, tambah 15 detik jika masih basah.'
    },
    {
        id: 76, name: 'Tahu Crispy Air Fryer', meal: 'snack', type: 'low-carb',
        emoji: '🧈', bg: 'linear-gradient(135deg, #E0D0B8, #D0C0A8)',
        desc: 'Tahu crispy tanpa minyak dari air fryer, dengan bumbu garlic parmesan. Kaya protein, rendah karbo.',
        cal: 180, protein: 16, carbs: 8, fat: 10, fiber: 2, prep: '20 menit',
        ingredients: ['Tahu putih 200g', 'Tepung maizena 1 sdm', 'Garlic powder 1/2 sdt', 'Parmesan 1 sdm', 'Garam, lada', 'Cooking spray', 'Saus sambal (celupan)'],
        steps: ['Potong tahu dadu 2cm. Keringkan dengan tisu dapur.', 'Campur maizena, garlic powder, garam, lada. Balurkan ke tahu.', 'Spray minyak tipis. Air fry 200°C 15-18 menit, kocok tengah jalan.', 'Keluarkan, taburi parmesan selagi panas.', 'Sajikan dengan saus sambal.'],
        tip: 'Tekan tahu dengan benda berat 15 menit untuk membuang air — kunci kriuk tanpa minyak.'
    },
    {
        id: 77, name: 'Smoothie Hijau Detox', meal: 'snack', type: 'vegetarian',
        emoji: '🥒', bg: 'linear-gradient(135deg, #A8C8A0, #98B890)',
        desc: 'Green smoothie dengan timun, seledri, dan apel hijau. Sangat rendah kalori dan menyegarkan.',
        cal: 100, protein: 2, carbs: 22, fat: 1, fiber: 4, prep: '5 menit',
        ingredients: ['Timun 1/2 buah', 'Seledri 1 batang', 'Apel hijau 1/2', 'Bayam 20g', 'Lemon 1/2', 'Jahe 1 cm', 'Air 100ml', 'Es batu'],
        steps: ['Potong kasar semua bahan.', 'Masukkan ke blender bersama air dan es batu.', 'Blender hingga halus.', 'Saring jika suka tekstur halus, atau minum langsung untuk serat lebih.'],
        tip: 'Minum segera setelah dibuat — nutrisi dan enzim dalam green juice menurun cepat setelah diblender.'
    },
    {
        id: 78, name: 'Keripik Kale Oven', meal: 'snack', type: 'low-carb',
        emoji: '🥬', bg: 'linear-gradient(135deg, #88A878, #789868)',
        desc: 'Keripik kale renyah dari oven dengan bumbu garlic salt. Pengganti keripik kentang yang lebih sehat.',
        cal: 90, protein: 4, carbs: 8, fat: 4, fiber: 2, prep: '18 menit',
        ingredients: ['Kale 100g (buang batang)', 'Minyak zaitun 1 sdt', 'Garlic powder 1/4 sdt', 'Garam laut sedikit', 'Nutritional yeast 1 sdt (opsional)'],
        steps: ['Cuci kale, keringkan sangat baik (penting!).', 'Robek kecil-kecil. Campurkan minyak zaitun dan bumbu.', 'Tata rata di baking tray (jangan tumpuk).', 'Panggang 150°C selama 12-15 menit hingga crispy.', 'Dinginkan sebentar — akan semakin renyah.'],
        tip: 'Kale HARUS benar-benar kering sebelum di-oven. Sisa air = keripik lembek.'
    },
    {
        id: 79, name: 'Ubi Jalar Panggang Kayu Manis', meal: 'snack', type: 'vegetarian',
        emoji: '🍠', bg: 'linear-gradient(135deg, #D8A880, #C89870)',
        desc: 'Wedges ubi jalar panggang dengan taburan kayu manis. Manis alami dan kaya beta-karoten.',
        cal: 160, protein: 2, carbs: 34, fat: 2, fiber: 5, prep: '30 menit',
        ingredients: ['Ubi jalar 150g', 'Kayu manis 1/4 sdt', 'Minyak kelapa 1/2 sdt', 'Garam sedikit', 'Madu 1 sdt (opsional)'],
        steps: ['Potong ubi jalar jadi wedges.', 'Campur dengan minyak kelapa, kayu manis, garam.', 'Tata di baking tray.', 'Panggang 200°C selama 25 menit, balik sekali di tengah.', 'Drizzle madu jika suka lebih manis.'],
        tip: 'Ubi jalar orange kaya beta-karoten — 1 porsi sudah memenuhi kebutuhan vitamin A harian.'
    },
    {
        id: 80, name: 'Cottage Cheese & Buah', meal: 'snack', type: 'high-protein',
        emoji: '🧀', bg: 'linear-gradient(135deg, #E8D8C8, #D8C8B8)',
        desc: 'Cottage cheese creamy dengan topping buah dan madu. Protein tinggi dari casein untuk rasa kenyang lama.',
        cal: 200, protein: 20, carbs: 18, fat: 5, fiber: 2, prep: '3 menit',
        ingredients: ['Cottage cheese 150g', 'Peach/persik 1/2 buah', 'Blueberry 20g', 'Madu 1 sdt', 'Walnut 3 butir'],
        steps: ['Tuang cottage cheese ke mangkuk.', 'Iris peach, tata bersama blueberry.', 'Drizzle madu, tambahkan walnut pecah.'],
        tip: 'Cottage cheese mengandung casein — protein slow-release yang ideal untuk snack malam agar kenyang sampai pagi.'
    },
    {
        id: 81, name: 'Popcorn Herbal', meal: 'snack', type: 'low-fat',
        emoji: '🍿', bg: 'linear-gradient(135deg, #F0E8C8, #E0D8B8)',
        desc: 'Popcorn air-popped dengan bumbu herbs tanpa butter. Snack volume besar dengan kalori kecil.',
        cal: 110, protein: 4, carbs: 20, fat: 2, fiber: 4, prep: '5 menit',
        ingredients: ['Jagung popcorn 30g', 'Nutritional yeast 1 sdm', 'Oregano 1/4 sdt', 'Garlic powder 1/4 sdt', 'Garam sedikit', 'Olive oil spray'],
        steps: ['Pop jagung di panci tertutup tanpa minyak (atau microwave).', 'Spray sedikit olive oil agar bumbu menempel.', 'Taburi nutritional yeast, oregano, garlic powder, garam.', 'Kocok dalam paper bag atau mangkuk besar agar merata.'],
        tip: 'Popcorn air-popped hanya 30 kkal per cup — Anda bisa makan 3 cup penuh dan tetap di bawah 100 kkal!'
    },
    {
        id: 82, name: 'Rice Cake & Alpukat', meal: 'snack', type: 'balanced',
        emoji: '🍘', bg: 'linear-gradient(135deg, #C8D0B8, #B8C0A8)',
        desc: 'Rice cake renyah dengan topping alpukat smash, tomat cherry, dan everything seasoning.',
        cal: 170, protein: 4, carbs: 18, fat: 10, fiber: 4, prep: '5 menit',
        ingredients: ['Rice cake 2 keping', 'Alpukat 1/4 buah', 'Tomat cherry 4 buah', 'Everything seasoning 1/4 sdt', 'Garam & lemon sedikit'],
        steps: ['Haluskan alpukat dengan garpu, tambahkan garam dan lemon.', 'Oles di atas rice cake.', 'Tambahkan tomat cherry belah.', 'Taburi everything seasoning.'],
        tip: 'Rice cake punya indeks glikemik tinggi — alpukat (lemak sehat) membantu memperlambat spike gula darah.'
    },
    {
        id: 83, name: 'Protein Balls Coklat Almond', meal: 'snack', type: 'high-protein',
        emoji: '⚫', bg: 'linear-gradient(135deg, #6B5B4B, #5B4B3B)',
        desc: 'Bola protein no-bake dengan whey, almond butter, dan dark chocolate chips. Snack gym yang praktis.',
        cal: 180, protein: 16, carbs: 14, fat: 8, fiber: 2, prep: '10 menit',
        ingredients: ['Whey protein coklat 1 scoop', 'Oat halus 30g', 'Almond butter 1 sdm', 'Madu 1 sdm', 'Dark choco chips 10g', 'Susu almond 1-2 sdm'],
        steps: ['Campur whey, oat, almond butter, madu di mangkuk.', 'Tambahkan choco chips.', 'Tambahkan susu almond sedikit-sedikit hingga adonan bisa dibentuk.', 'Bulatkan jadi 4-5 bola.', 'Simpan di kulkas. Tahan 5 hari.'],
        tip: 'Buat 20 bola sekaligus di weekend — simpan di freezer, ambil 2-3 sebelum gym.'
    },
    {
        id: 84, name: 'Jicama Sticks & Guacamole', meal: 'snack', type: 'low-carb',
        emoji: '🫑', bg: 'linear-gradient(135deg, #B8C8A0, #A8B890)',
        desc: 'Stik bengkoang renyah dengan guacamole homemade. Crunchy, fresh, dan sangat rendah kalori.',
        cal: 160, protein: 4, carbs: 16, fat: 10, fiber: 6, prep: '10 menit',
        ingredients: ['Bengkoang 150g', 'Alpukat 1/2 buah', 'Tomat 1/2 buah', 'Bawang merah 1/4', 'Jeruk nipis 1/2', 'Cabai rawit 1 (opsional)', 'Garam, ketumbar bubuk'],
        steps: ['Kupas bengkoang, potong stik panjang.', 'Buat guacamole: haluskan alpukat, campur tomat cincang, bawang merah cincang, perasan jeruk nipis, garam, ketumbar.', 'Sajikan stik bengkoang dengan guacamole sebagai dip.'],
        tip: 'Bengkoang adalah pengganti chips yang brilian — renyah, rendah kalori, dan kaya prebiotik inulin untuk usus sehat.'
    },
    {
        id: 85, name: 'Telur Rebus Bumbu Bali', meal: 'snack', type: 'high-protein',
        emoji: '🥚', bg: 'linear-gradient(135deg, #E0C8A0, #D0B890)',
        desc: 'Telur rebus dengan bumbu Bali (base genep) yang aromatik. Snack tinggi protein yang bisa di-meal prep.',
        cal: 180, protein: 14, carbs: 6, fat: 12, fiber: 1, prep: '20 menit',
        ingredients: ['Telur 2 butir', 'Bumbu halus: bawang merah, bawang putih, kunyit, jahe, lengkuas, cabai', 'Kecap manis 1 sdm', 'Daun salam 1', 'Garam, gula', 'Minyak 1 sdt'],
        steps: ['Rebus telur hingga matang. Kupas.', 'Haluskan bumbu, tumis hingga harum.', 'Masukkan telur, aduk agar bumbu merata.', 'Tambahkan kecap manis, gula, garam. Masak 5 menit.', 'Sajikan hangat atau dingin.'],
        tip: 'Buat 6-8 telur sekaligus dan simpan di kulkas — snack siap ambil sepanjang minggu.'
    },
    {
        id: 86, name: 'Frozen Yogurt Bark', meal: 'snack', type: 'low-fat',
        emoji: '🧊', bg: 'linear-gradient(135deg, #D0C0D8, #C0B0C8)',
        desc: 'Lembaran yogurt beku dengan topping buah dan granola. Dessert sehat pengganti es krim.',
        cal: 150, protein: 10, carbs: 22, fat: 3, fiber: 2, prep: '5 menit + beku',
        ingredients: ['Greek yogurt 200g', 'Madu 1 sdm', 'Strawberry iris 4 buah', 'Blueberry 20g', 'Granola 15g', 'Coconut flakes 1 sdt'],
        steps: ['Campur yogurt dengan madu.', 'Tuang rata di baking tray berlapis baking paper.', 'Tata buah-buahan, granola, coconut flakes di atas.', 'Bekukan minimal 3 jam.', 'Patahkan jadi potongan-potongan. Simpan di freezer.'],
        tip: 'Keluarkan dari freezer 3-5 menit sebelum dimakan agar tidak terlalu keras dan mudah dipatahkan.'
    },
    {
        id: 87, name: 'Onde-Onde Ubi Panggang', meal: 'snack', type: 'vegetarian',
        emoji: '🟡', bg: 'linear-gradient(135deg, #E8C878, #D8B868)',
        desc: 'Onde-onde versi panggang oven dari ubi kuning dengan isian kacang hijau. Tanpa gorengan!',
        cal: 170, protein: 4, carbs: 32, fat: 4, fiber: 3, prep: '35 menit',
        ingredients: ['Ubi kuning 150g (kukus, haluskan)', 'Tepung ketan 30g', 'Gula aren 1 sdm', 'Kacang hijau halus 30g (isian)', 'Wijen 2 sdm', 'Garam sedikit'],
        steps: ['Campurkan ubi halus, tepung ketan, gula aren, garam. Uleni.', 'Ambil 1 sdm adonan, pipihkan, isi kacang hijau. Bulatkan.', 'Gulingkan di wijen.', 'Tata di baking tray. Panggang 180°C 20-25 menit.', 'Sajikan hangat.'],
        tip: 'Versi panggang punya kalori 40% lebih rendah dari gorengan dan tetap punya tekstur wijen yang renyah.'
    },
    {
        id: 88, name: 'Chia Pudding Coklat', meal: 'snack', type: 'low-carb',
        emoji: '🍫', bg: 'linear-gradient(135deg, #8B6B4B, #7B5B3B)',
        desc: 'Pudding chia rasa coklat yang lembut dan creamy. Disiapkan semalam, kaya omega-3 dan serat.',
        cal: 190, protein: 8, carbs: 18, fat: 10, fiber: 8, prep: '5 menit + semalam',
        ingredients: ['Chia seed 3 sdm', 'Susu almond 200ml', 'Cocoa powder 1 sdm', 'Madu 1 sdt', 'Vanilla extract 1/4 sdt', 'Pisang iris (topping)'],
        steps: ['Campur chia seed, susu almond, cocoa, madu, vanilla di jar.', 'Aduk rata, tutup.', 'Simpan di kulkas semalam (min 4 jam).', 'Aduk sekali lagi sebelum dimakan.', 'Tambahkan topping pisang.'],
        tip: 'Aduk chia pudding setelah 30 menit pertama untuk mencegah gumpalan, lalu biarkan semalam.'
    },
    {
        id: 89, name: 'Tempe Chips BBQ', meal: 'snack', type: 'high-protein',
        emoji: '🔥', bg: 'linear-gradient(135deg, #C89070, #B88060)',
        desc: 'Keripik tempe tipis panggang oven dengan bumbu BBQ smoky. Protein nabati crunchy!',
        cal: 170, protein: 14, carbs: 12, fat: 8, fiber: 4, prep: '25 menit',
        ingredients: ['Tempe 150g', 'Paprika bubuk 1/2 sdt', 'Garlic powder 1/4 sdt', 'Onion powder 1/4 sdt', 'Smoked paprika 1/4 sdt', 'Gula aren bubuk 1/2 sdt', 'Garam', 'Cooking spray'],
        steps: ['Iris tempe sangat tipis (2mm) menggunakan mandoline/pisau tajam.', 'Campur semua bumbu kering.', 'Tata tempe di baking tray, spray minyak tipis.', 'Taburi bumbu BBQ merata.', 'Panggang 170°C 15-20 menit hingga crispy. Balik sekali.'],
        tip: 'Semakin tipis irisan, semakin renyah hasilnya. Mandoline slicer sangat membantu untuk ketipisan seragam.'
    },
    {
        id: 90, name: 'Infused Water Mentimun Mint', meal: 'snack', type: 'low-fat',
        emoji: '💧', bg: 'linear-gradient(135deg, #A8D0D8, #98C0C8)',
        desc: 'Air infus dengan timun, lemon, dan mint segar. Nol kalori, membantu hidrasi dan detox alami.',
        cal: 5, protein: 0, carbs: 1, fat: 0, fiber: 0, prep: '5 menit',
        ingredients: ['Air mineral 1 liter', 'Timun 1/2 buah iris', 'Lemon 1/2 buah iris', 'Mint segar 5 lembar', 'Es batu'],
        steps: ['Iris tipis timun dan lemon.', 'Masukkan ke dalam botol/pitcher bersama daun mint.', 'Isi dengan air dingin dan es batu.', 'Diamkan minimal 30 menit di kulkas agar rasa meresap.'],
        tip: 'Ganti air setiap hari, tapi buah dan mint bisa dipakai hingga 2x pengisian. Jangan lebih — akan pahit.'
    },
    {
        id: 91, name: 'Banana Nice Cream', meal: 'snack', type: 'vegetarian',
        emoji: '🍦', bg: 'linear-gradient(135deg, #F0E0B0, #E0D0A0)',
        desc: 'Es krim pisang satu bahan — hanya pisang beku! Creamy alami tanpa gula, susu, atau krim tambahan.',
        cal: 140, protein: 2, carbs: 32, fat: 1, fiber: 3, prep: '5 menit + beku',
        ingredients: ['Pisang matang 2 buah (beku)', 'Cocoa powder 1 sdt (opsional)', 'Selai kacang 1 sdt (opsional)', 'Topping: granola, buah, choco chips'],
        steps: ['Potong pisang, bekukan semalam.', 'Blender pisang beku hingga creamy — tahap: remah > pasir > creamy (2-3 menit).', 'Tambahkan cocoa atau selai kacang jika mau variasi rasa.', 'Sajikan segera sebagai soft serve, atau bekukan 1 jam untuk tekstur es krim.'],
        tip: 'Pisang HARUS sangat matang (bintik coklat) sebelum dibekukan — semakin matang, semakin manis alami.'
    }
];

const mealPlans = {
    1500: [
        { time: '07:00', label: 'Sarapan', name: 'Oatmeal + Telur Rebus', desc: 'Oatmeal 40g dengan pisang iris, 2 telur rebus, teh hijau tanpa gula.', cal: 350 },
        { time: '10:00', label: 'Snack', name: 'Buah & Yogurt', desc: 'Greek yogurt 100g rendah lemak dengan 1 buah apel.', cal: 150 },
        { time: '12:30', label: 'Makan Siang', name: 'Nasi Merah + Dada Ayam', desc: 'Nasi merah 100g, dada ayam panggang 120g, tumis brokoli wortel, sup sayur.', cal: 450 },
        { time: '15:30', label: 'Snack', name: 'Kacang Almond', desc: 'Almond panggang 15 butir (sekitar 20g) dan 1 buah jeruk.', cal: 150 },
        { time: '18:30', label: 'Makan Malam', name: 'Ikan Panggang + Sayur', desc: 'Ikan kakap panggang 150g, salad sayuran segar dengan dressing lemon, ubi rebus 100g.', cal: 400 }
    ],
    1800: [
        { time: '07:00', label: 'Sarapan', name: 'Roti Gandum + Telur Orak-Arik', desc: 'Roti gandum 2 lembar, telur orak-arik 2 butir dengan sayuran, segelas susu rendah lemak.', cal: 420 },
        { time: '10:00', label: 'Snack', name: 'Smoothie Buah', desc: 'Smoothie pisang + bayam + susu almond 250ml, 1 sendok selai kacang.', cal: 200 },
        { time: '12:30', label: 'Makan Siang', name: 'Nasi + Ayam Teriyaki', desc: 'Nasi putih 150g, ayam teriyaki homemade 150g, capcay sayuran, tempe goreng 2 potong.', cal: 550 },
        { time: '15:30', label: 'Snack', name: 'Roti + Selai Kacang', desc: 'Roti gandum 1 lembar dengan selai kacang 1 sdm, pisang 1 buah.', cal: 200 },
        { time: '18:30', label: 'Makan Malam', name: 'Sup Ayam + Tahu', desc: 'Sup ayam sayuran lengkap, tahu kukus 2 potong, nasi merah 100g.', cal: 430 }
    ],
    2000: [
        { time: '07:00', label: 'Sarapan', name: 'Nasi Goreng Sehat', desc: 'Nasi merah goreng 150g dengan telur, sayuran, dan ayam suwir. Jus jeruk segar.', cal: 480 },
        { time: '10:00', label: 'Snack', name: 'Granola Bar + Buah', desc: 'Homemade granola bar 1 buah, pisang 1 buah, teh hijau.', cal: 250 },
        { time: '12:30', label: 'Makan Siang', name: 'Nasi + Ikan Bakar', desc: 'Nasi putih 150g, ikan bakar bumbu padang 200g, lalapan + sambal, sayur asem.', cal: 600 },
        { time: '15:30', label: 'Snack', name: 'Ubi Rebus + Kacang', desc: 'Ubi jalar rebus 150g, edamame rebus 50g.', cal: 220 },
        { time: '18:30', label: 'Makan Malam', name: 'Steak Tempe + Salad', desc: 'Tempe steak 200g, salad besar dengan olive oil dressing, jagung rebus 1 buah.', cal: 450 }
    ],
    2500: [
        { time: '07:00', label: 'Sarapan', name: 'Pancake Oat + Telur', desc: 'Pancake oat 3 lembar dengan madu, 3 telur orak-arik, pisang, susu coklat rendah gula.', cal: 600 },
        { time: '10:00', label: 'Snack', name: 'Roti + Alpukat + Telur', desc: 'Roti gandum 2 lembar, alpukat 1/2 buah, telur rebus 1 butir.', cal: 350 },
        { time: '12:30', label: 'Makan Siang', name: 'Nasi + Rendang + Sayur', desc: 'Nasi putih 200g, rendang daging 150g, tumis kangkung, tahu goreng 2 potong, kerupuk.', cal: 700 },
        { time: '15:30', label: 'Snack', name: 'Protein Smoothie', desc: 'Smoothie pisang + oat + selai kacang + susu 350ml.', cal: 350 },
        { time: '18:30', label: 'Makan Malam', name: 'Ayam Panggang + Nasi', desc: 'Paha ayam panggang 200g, nasi merah 150g, sup sayuran, tempe bacem 2 potong.', cal: 500 }
    ]
};

const workoutPrograms = {
  home: {
    beginner: [
        {
            day: 'Senin', focus: 'Full Body',
            exercises: [
                { name: 'Jumping Jacks', detail: '3 x 20 rep' },
                { name: 'Wall Push-up', detail: '3 x 10 rep' },
                { name: 'Bodyweight Squat', detail: '3 x 12 rep' },
                { name: 'Knee Plank', detail: '3 x 20 detik' },
                { name: 'Glute Bridge', detail: '3 x 12 rep' },
                { name: 'Standing Calf Raise', detail: '3 x 15 rep' }
            ]
        },
        {
            day: 'Selasa', focus: 'Kardio Ringan',
            exercises: [
                { name: 'Jalan Cepat di Tempat', detail: '5 menit' },
                { name: 'March in Place (Lutut Tinggi)', detail: '3 x 30 detik' },
                { name: 'Step Touch Side to Side', detail: '3 x 1 menit' },
                { name: 'Standing Knee to Elbow', detail: '3 x 10/sisi' },
                { name: 'Arm Circles', detail: '2 x 30 detik' },
                { name: 'Cool Down Stretching', detail: '5 menit' }
            ]
        },
        { day: 'Rabu', focus: 'Istirahat', rest: true },
        {
            day: 'Kamis', focus: 'Upper Body',
            exercises: [
                { name: 'Incline Push-up (Meja)', detail: '3 x 10 rep' },
                { name: 'Tricep Dips (Kursi)', detail: '3 x 8 rep' },
                { name: 'Arm Circles', detail: '3 x 30 detik' },
                { name: 'Superman Hold', detail: '3 x 15 detik' },
                { name: 'Wall Angels', detail: '3 x 10 rep' },
                { name: 'Plank Shoulder Tap', detail: '3 x 8/sisi' }
            ]
        },
        {
            day: 'Jumat', focus: 'Lower Body',
            exercises: [
                { name: 'Bodyweight Squat', detail: '3 x 15 rep' },
                { name: 'Lunges', detail: '3 x 10/kaki' },
                { name: 'Glute Bridge', detail: '3 x 15 rep' },
                { name: 'Calf Raise', detail: '3 x 20 rep' },
                { name: 'Wall Sit', detail: '3 x 20 detik' },
                { name: 'Side Lying Leg Raise', detail: '3 x 12/sisi' }
            ]
        },
        {
            day: 'Sabtu', focus: 'Kardio + Core',
            exercises: [
                { name: 'Jumping Jacks', detail: '3 x 30 rep' },
                { name: 'High Knees', detail: '3 x 20 detik' },
                { name: 'Mountain Climber (Pelan)', detail: '3 x 10/sisi' },
                { name: 'Bicycle Crunch', detail: '3 x 10/sisi' },
                { name: 'Dead Bug', detail: '3 x 8/sisi' },
                { name: 'Plank Hold', detail: '3 x 20 detik' }
            ]
        },
        { day: 'Minggu', focus: 'Istirahat', rest: true }
    ],
    intermediate: [
        {
            day: 'Senin', focus: 'Push (Dada/Bahu/Trisep)',
            exercises: [
                { name: 'Push-up Standar', detail: '4 x 15 rep' },
                { name: 'Diamond Push-up', detail: '3 x 10 rep' },
                { name: 'Decline Push-up', detail: '3 x 12 rep' },
                { name: 'Pike Push-up', detail: '3 x 10 rep' },
                { name: 'Tricep Dips', detail: '3 x 12 rep' },
                { name: 'Plank to Push-up', detail: '3 x 8 rep' }
            ]
        },
        {
            day: 'Selasa', focus: 'Pull (Punggung/Bisep)',
            exercises: [
                { name: 'Superman', detail: '4 x 15 rep' },
                { name: 'Reverse Snow Angel', detail: '3 x 12 rep' },
                { name: 'Towel Rows (Pakai Handuk)', detail: '3 x 12 rep' },
                { name: 'Prone Y-T-W Raises', detail: '3 x 8 rep' },
                { name: 'Doorway Curls', detail: '3 x 10 rep' },
                { name: 'Plank Row (Tanpa Beban)', detail: '3 x 10/sisi' }
            ]
        },
        {
            day: 'Rabu', focus: 'HIIT Kardio',
            exercises: [
                { name: 'Burpees', detail: '4 x 8 rep' },
                { name: 'Jump Squat', detail: '4 x 12 rep' },
                { name: 'Mountain Climbers', detail: '4 x 20 rep' },
                { name: 'High Knees', detail: '4 x 30 detik' },
                { name: 'Skater Jumps', detail: '3 x 12/sisi' },
                { name: 'Plank Jacks', detail: '3 x 15 rep' }
            ]
        },
        {
            day: 'Kamis', focus: 'Legs & Glutes',
            exercises: [
                { name: 'Jump Squat', detail: '4 x 12 rep' },
                { name: 'Bulgarian Split Squat', detail: '3 x 10/kaki' },
                { name: 'Sumo Squat', detail: '4 x 15 rep' },
                { name: 'Single Leg Glute Bridge', detail: '3 x 12/kaki' },
                { name: 'Curtsy Lunge', detail: '3 x 10/kaki' },
                { name: 'Wall Sit Hold', detail: '3 x 45 detik' }
            ]
        },
        {
            day: 'Jumat', focus: 'Core & Abs',
            exercises: [
                { name: 'Plank Hold', detail: '3 x 45 detik' },
                { name: 'Bicycle Crunch', detail: '4 x 20 rep' },
                { name: 'Leg Raises', detail: '3 x 12 rep' },
                { name: 'Russian Twist', detail: '3 x 15/sisi' },
                { name: 'Mountain Climber Cross', detail: '3 x 12/sisi' },
                { name: 'Hollow Body Hold', detail: '3 x 20 detik' }
            ]
        },
        {
            day: 'Sabtu', focus: 'Active Recovery',
            exercises: [
                { name: 'Jalan Kaki 30 Menit', detail: 'Santai' },
                { name: 'Yoga Stretching', detail: '15 menit' },
                { name: 'Foam Rolling (Opsional)', detail: '10 menit' },
                { name: 'Deep Breathing Exercise', detail: '5 menit' }
            ]
        },
        { day: 'Minggu', focus: 'Istirahat', rest: true }
    ],
    advanced: [
        {
            day: 'Senin', focus: 'Push Power',
            exercises: [
                { name: 'Clap Push-up', detail: '4 x 10 rep' },
                { name: 'Archer Push-up', detail: '3 x 8/sisi' },
                { name: 'Decline Diamond Push-up', detail: '3 x 12 rep' },
                { name: 'Pike Push-up (Elevated)', detail: '4 x 10 rep' },
                { name: 'Hindu Push-up', detail: '3 x 12 rep' },
                { name: 'Pseudo Planche Push-up', detail: '3 x 8 rep' },
                { name: 'Tricep Dips (Deep)', detail: '3 x 15 rep' }
            ]
        },
        {
            day: 'Selasa', focus: 'Legs Explosive',
            exercises: [
                { name: 'Pistol Squat (Assisted)', detail: '4 x 6/kaki' },
                { name: 'Jump Lunge', detail: '4 x 12 rep' },
                { name: 'Box Jump (Kursi Rendah)', detail: '4 x 10 rep' },
                { name: 'Single Leg Deadlift', detail: '3 x 10/kaki' },
                { name: 'Sumo Squat Pulse', detail: '3 x 20 rep' },
                { name: 'Nordic Curl (Assisted)', detail: '3 x 6 rep' },
                { name: 'Calf Raise (Single Leg)', detail: '3 x 15/kaki' }
            ]
        },
        {
            day: 'Rabu', focus: 'HIIT Extreme',
            exercises: [
                { name: 'Burpee + Tuck Jump', detail: '5 x 8 rep' },
                { name: 'Mountain Climbers Sprint', detail: '5 x 30 detik' },
                { name: 'Jump Squat 180', detail: '4 x 10 rep' },
                { name: 'Plank to Squat Jump', detail: '4 x 8 rep' },
                { name: 'Spider-Man Push-up', detail: '3 x 8/sisi' },
                { name: 'Lateral Bound', detail: '4 x 10/sisi' }
            ]
        },
        {
            day: 'Kamis', focus: 'Pull & Back',
            exercises: [
                { name: 'Australian Pull-up (Meja)', detail: '4 x 12 rep' },
                { name: 'Towel Rows (Explosive)', detail: '4 x 12 rep' },
                { name: 'Superman Pulse', detail: '4 x 20 rep' },
                { name: 'Reverse Plank', detail: '3 x 30 detik' },
                { name: 'Prone Y Raise', detail: '3 x 12 rep' },
                { name: 'Door Frame Rows', detail: '3 x 10 rep' },
                { name: 'Back Extension Hold', detail: '3 x 20 detik' }
            ]
        },
        {
            day: 'Jumat', focus: 'Core Crusher',
            exercises: [
                { name: 'L-Sit Hold (Kursi)', detail: '4 x 15 detik' },
                { name: 'Dragon Flag (Assisted)', detail: '3 x 6 rep' },
                { name: 'Ab Wheel Rollout (Handuk)', detail: '3 x 10 rep' },
                { name: 'Hanging Knee Raise', detail: '4 x 12 rep' },
                { name: 'Plank (Arms Extended)', detail: '3 x 45 detik' },
                { name: 'V-Up', detail: '3 x 15 rep' },
                { name: 'Side Plank + Rotation', detail: '3 x 10/sisi' }
            ]
        },
        {
            day: 'Sabtu', focus: 'Full Body Circuit',
            exercises: [
                { name: 'Burpees', detail: '5 x 10 rep' },
                { name: 'Push-up Variations', detail: '4 x 15 rep' },
                { name: 'Jump Squat', detail: '4 x 15 rep' },
                { name: 'Mountain Climbers', detail: '4 x 30 detik' },
                { name: 'Plank to Push-up', detail: '4 x 10 rep' },
                { name: 'Squat Hold Pulse', detail: '3 x 30 detik' }
            ]
        },
        { day: 'Minggu', focus: 'Istirahat', rest: true }
    ]
  },
  gym: {
    beginner: [
      { day: 'Senin', focus: 'Full Body Machines', exercises: [
        { name: 'Treadmill Warm-up', detail: '10 menit jalan cepat' },
        { name: 'Leg Press Machine', detail: '3 x 12 rep' },
        { name: 'Chest Press Machine', detail: '3 x 12 rep' },
        { name: 'Seated Row Machine', detail: '3 x 12 rep' },
        { name: 'Lat Pulldown', detail: '3 x 10 rep' },
        { name: 'Plank', detail: '3 x 30 detik' }
      ]},
      { day: 'Selasa', focus: 'Kardio', exercises: [
        { name: 'Treadmill (Incline 3%)', detail: '20 menit' },
        { name: 'Sepeda Statis', detail: '15 menit' },
        { name: 'Stretching', detail: '10 menit' }
      ]},
      { day: 'Rabu', focus: 'Istirahat', rest: true },
      { day: 'Kamis', focus: 'Upper Body', exercises: [
        { name: 'Dumbbell Shoulder Press', detail: '3 x 10 rep' },
        { name: 'Dumbbell Bicep Curl', detail: '3 x 12 rep' },
        { name: 'Tricep Pushdown', detail: '3 x 12 rep' },
        { name: 'Chest Fly Machine', detail: '3 x 12 rep' },
        { name: 'Lateral Raise', detail: '3 x 10 rep' }
      ]},
      { day: 'Jumat', focus: 'Lower Body', exercises: [
        { name: 'Leg Press', detail: '3 x 15 rep' },
        { name: 'Leg Extension', detail: '3 x 12 rep' },
        { name: 'Leg Curl', detail: '3 x 12 rep' },
        { name: 'Calf Raise Machine', detail: '3 x 15 rep' },
        { name: 'Glute Kickback', detail: '3 x 12/kaki' }
      ]},
      { day: 'Sabtu', focus: 'Core & Kardio', exercises: [
        { name: 'Treadmill', detail: '15 menit' },
        { name: 'Ab Crunch Machine', detail: '3 x 15 rep' },
        { name: 'Cable Woodchop', detail: '3 x 10/sisi' },
        { name: 'Hanging Knee Raise (Assisted)', detail: '3 x 10 rep' }
      ]},
      { day: 'Minggu', focus: 'Istirahat', rest: true }
    ],
    intermediate: [
      { day: 'Senin', focus: 'Push (Chest/Shoulder/Tricep)', exercises: [
        { name: 'Barbell Bench Press', detail: '4 x 10 rep' },
        { name: 'Incline Dumbbell Press', detail: '4 x 10 rep' },
        { name: 'Overhead Press', detail: '4 x 8 rep' },
        { name: 'Lateral Raise', detail: '3 x 12 rep' },
        { name: 'Tricep Dips', detail: '3 x 10 rep' },
        { name: 'Cable Tricep Pushdown', detail: '3 x 12 rep' }
      ]},
      { day: 'Selasa', focus: 'Pull (Back/Bicep)', exercises: [
        { name: 'Deadlift', detail: '4 x 6 rep' },
        { name: 'Pull-up (Assisted)', detail: '4 x 8 rep' },
        { name: 'Barbell Row', detail: '4 x 10 rep' },
        { name: 'Lat Pulldown', detail: '3 x 12 rep' },
        { name: 'Barbell Bicep Curl', detail: '3 x 10 rep' },
        { name: 'Hammer Curl', detail: '3 x 12 rep' }
      ]},
      { day: 'Rabu', focus: 'Kardio HIIT', exercises: [
        { name: 'Rowing Machine Sprint', detail: '10 x 30 detik' },
        { name: 'Treadmill Sprint', detail: '8 x 45 detik' },
        { name: 'Battle Rope', detail: '3 x 30 detik' }
      ]},
      { day: 'Kamis', focus: 'Legs', exercises: [
        { name: 'Barbell Back Squat', detail: '4 x 10 rep' },
        { name: 'Romanian Deadlift', detail: '4 x 10 rep' },
        { name: 'Walking Lunge (Dumbbell)', detail: '3 x 12/kaki' },
        { name: 'Leg Press', detail: '3 x 12 rep' },
        { name: 'Calf Raise', detail: '4 x 15 rep' }
      ]},
      { day: 'Jumat', focus: 'Shoulder & Arms', exercises: [
        { name: 'Dumbbell Shoulder Press', detail: '4 x 10 rep' },
        { name: 'Arnold Press', detail: '3 x 10 rep' },
        { name: 'Front Raise', detail: '3 x 12 rep' },
        { name: 'EZ Bar Curl', detail: '3 x 10 rep' },
        { name: 'Skullcrusher', detail: '3 x 12 rep' }
      ]},
      { day: 'Sabtu', focus: 'Core & Kardio', exercises: [
        { name: 'Stairmaster', detail: '20 menit' },
        { name: 'Cable Crunch', detail: '4 x 15 rep' },
        { name: 'Russian Twist (Plate)', detail: '3 x 20/sisi' },
        { name: 'Plank', detail: '3 x 60 detik' }
      ]},
      { day: 'Minggu', focus: 'Istirahat', rest: true }
    ],
    advanced: [
      { day: 'Senin', focus: 'Chest Heavy', exercises: [
        { name: 'Barbell Bench Press', detail: '5 x 5 rep' },
        { name: 'Incline Barbell Press', detail: '4 x 8 rep' },
        { name: 'Weighted Dips', detail: '4 x 8 rep' },
        { name: 'Dumbbell Fly', detail: '3 x 12 rep' },
        { name: 'Cable Crossover', detail: '3 x 15 rep' },
        { name: 'Push-up Finisher', detail: '3 x AMRAP' }
      ]},
      { day: 'Selasa', focus: 'Back Heavy', exercises: [
        { name: 'Deadlift', detail: '5 x 5 rep' },
        { name: 'Weighted Pull-up', detail: '5 x 6 rep' },
        { name: 'T-Bar Row', detail: '4 x 8 rep' },
        { name: 'Seated Cable Row', detail: '3 x 10 rep' },
        { name: 'Face Pull', detail: '3 x 15 rep' },
        { name: 'Shrugs', detail: '4 x 12 rep' }
      ]},
      { day: 'Rabu', focus: 'Legs Heavy', exercises: [
        { name: 'Barbell Back Squat', detail: '5 x 5 rep' },
        { name: 'Front Squat', detail: '4 x 6 rep' },
        { name: 'Romanian Deadlift', detail: '4 x 8 rep' },
        { name: 'Bulgarian Split Squat', detail: '3 x 10/kaki' },
        { name: 'Leg Curl', detail: '3 x 12 rep' },
        { name: 'Standing Calf Raise', detail: '5 x 15 rep' }
      ]},
      { day: 'Kamis', focus: 'Shoulder Power', exercises: [
        { name: 'Overhead Press', detail: '5 x 5 rep' },
        { name: 'Push Press', detail: '4 x 6 rep' },
        { name: 'Seated Dumbbell Press', detail: '4 x 10 rep' },
        { name: 'Lateral Raise Drop Set', detail: '3 x 20 rep' },
        { name: 'Rear Delt Fly', detail: '3 x 15 rep' },
        { name: 'Upright Row', detail: '3 x 12 rep' }
      ]},
      { day: 'Jumat', focus: 'Arms Pump', exercises: [
        { name: 'Close Grip Bench Press', detail: '4 x 8 rep' },
        { name: 'Barbell Curl', detail: '4 x 8 rep' },
        { name: 'Preacher Curl', detail: '3 x 10 rep' },
        { name: 'Cable Tricep Rope', detail: '4 x 12 rep' },
        { name: 'Concentration Curl', detail: '3 x 12/lengan' },
        { name: 'Dips Superset', detail: '3 x AMRAP' }
      ]},
      { day: 'Sabtu', focus: 'Kardio + Core', exercises: [
        { name: 'Rowing Machine', detail: '2000m timed' },
        { name: 'Weighted Decline Sit-up', detail: '4 x 15 rep' },
        { name: 'Hanging Leg Raise', detail: '4 x 12 rep' },
        { name: 'Cable Woodchop', detail: '3 x 12/sisi' },
        { name: 'Plank (Weighted)', detail: '3 x 60 detik' }
      ]},
      { day: 'Minggu', focus: 'Istirahat', rest: true }
    ]
  },
  pilates: {
    beginner: [
      { day: 'Senin', focus: 'Core Foundation', exercises: [
        { name: 'Pelvic Tilt', detail: '3 x 10 rep' },
        { name: 'The Hundred (Modified)', detail: '3 x 50 count' },
        { name: 'Single Leg Stretch', detail: '3 x 10/kaki' },
        { name: 'Bridge', detail: '3 x 12 rep' },
        { name: 'Cat-Cow Stretch', detail: '3 x 10 rep' }
      ]},
      { day: 'Selasa', focus: 'Flexibility', exercises: [
        { name: 'Spine Stretch Forward', detail: '3 x 8 rep' },
        { name: 'Roll Up (Assisted)', detail: '3 x 6 rep' },
        { name: 'Saw', detail: '3 x 6/sisi' },
        { name: 'Mermaid Stretch', detail: '3 x 8/sisi' },
        { name: 'Child Pose Hold', detail: '3 x 30 detik' }
      ]},
      { day: 'Rabu', focus: 'Istirahat', rest: true },
      { day: 'Kamis', focus: 'Legs & Glutes', exercises: [
        { name: 'Side Lying Leg Lift', detail: '3 x 12/sisi' },
        { name: 'Clamshell', detail: '3 x 15/sisi' },
        { name: 'Leg Circle', detail: '3 x 8/kaki' },
        { name: 'Bridge March', detail: '3 x 10/kaki' },
        { name: 'Standing Leg Lift', detail: '3 x 10/kaki' }
      ]},
      { day: 'Jumat', focus: 'Posture & Back', exercises: [
        { name: 'Swan Prep', detail: '3 x 8 rep' },
        { name: 'Swimming (Slow)', detail: '3 x 30 detik' },
        { name: 'Shoulder Bridge', detail: '3 x 10 rep' },
        { name: 'Wall Roll Down', detail: '3 x 6 rep' },
        { name: 'Thread the Needle', detail: '3 x 8/sisi' }
      ]},
      { day: 'Sabtu', focus: 'Gentle Flow', exercises: [
        { name: 'Breathing Warm-up', detail: '5 menit' },
        { name: 'Roll Down', detail: '3 x 5 rep' },
        { name: 'Spine Twist', detail: '3 x 8/sisi' },
        { name: 'Mermaid', detail: '3 x 8/sisi' },
        { name: 'Final Relaxation', detail: '5 menit' }
      ]},
      { day: 'Minggu', focus: 'Istirahat', rest: true }
    ],
    intermediate: [
      { day: 'Senin', focus: 'Classic Mat Flow', exercises: [
        { name: 'The Hundred', detail: '3 x 100 count' },
        { name: 'Roll Up', detail: '3 x 8 rep' },
        { name: 'Single Leg Circle', detail: '3 x 6/kaki' },
        { name: 'Rolling Like a Ball', detail: '3 x 10 rep' },
        { name: 'Single Leg Stretch', detail: '3 x 12/kaki' },
        { name: 'Double Leg Stretch', detail: '3 x 10 rep' }
      ]},
      { day: 'Selasa', focus: 'Core Power', exercises: [
        { name: 'Scissors', detail: '3 x 10/kaki' },
        { name: 'Lower Lift', detail: '3 x 10 rep' },
        { name: 'Criss-Cross', detail: '3 x 12/sisi' },
        { name: 'Teaser Prep', detail: '3 x 6 rep' },
        { name: 'Plank Hold', detail: '3 x 45 detik' }
      ]},
      { day: 'Rabu', focus: 'Stretch & Mobility', exercises: [
        { name: 'Spine Stretch Forward', detail: '3 x 10 rep' },
        { name: 'Saw', detail: '3 x 8/sisi' },
        { name: 'Open Leg Rocker', detail: '3 x 8 rep' },
        { name: 'Corkscrew', detail: '3 x 6 rep' },
        { name: 'Mermaid', detail: '3 x 8/sisi' }
      ]},
      { day: 'Kamis', focus: 'Back & Posture', exercises: [
        { name: 'Swan', detail: '3 x 8 rep' },
        { name: 'Swimming', detail: '3 x 30 detik' },
        { name: 'Single Leg Kick', detail: '3 x 10/kaki' },
        { name: 'Double Leg Kick', detail: '3 x 8 rep' },
        { name: 'Rest Pose', detail: '3 x 30 detik' }
      ]},
      { day: 'Jumat', focus: 'Legs & Glutes', exercises: [
        { name: 'Side Kick Series', detail: '3 x 10/sisi' },
        { name: 'Inner Thigh Lift', detail: '3 x 12/sisi' },
        { name: 'Bridge with Extension', detail: '3 x 10 rep' },
        { name: 'Standing Leg Pumps', detail: '3 x 12/kaki' },
        { name: 'Hip Circles', detail: '3 x 8/arah' }
      ]},
      { day: 'Sabtu', focus: 'Full Body Flow', exercises: [
        { name: 'Teaser 1', detail: '3 x 5 rep' },
        { name: 'Seal', detail: '3 x 8 rep' },
        { name: 'Jackknife', detail: '3 x 6 rep' },
        { name: 'Boomerang Prep', detail: '3 x 5 rep' },
        { name: 'Final Stretch', detail: '5 menit' }
      ]},
      { day: 'Minggu', focus: 'Istirahat', rest: true }
    ],
    advanced: [
      { day: 'Senin', focus: 'Advanced Mat Flow', exercises: [
        { name: 'The Hundred', detail: '4 x 100 count' },
        { name: 'Roll Up', detail: '4 x 10 rep' },
        { name: 'Roll Over', detail: '3 x 6 rep' },
        { name: 'Teaser Full', detail: '4 x 6 rep' },
        { name: 'Control Balance', detail: '3 x 4/kaki' }
      ]},
      { day: 'Selasa', focus: 'Power Core', exercises: [
        { name: 'Criss-Cross', detail: '4 x 20/sisi' },
        { name: 'Corkscrew Advanced', detail: '3 x 8 rep' },
        { name: 'Jackknife', detail: '4 x 8 rep' },
        { name: 'Scissors (Hold)', detail: '3 x 12/kaki' },
        { name: 'Hollow Hold', detail: '3 x 45 detik' }
      ]},
      { day: 'Rabu', focus: 'Strength & Balance', exercises: [
        { name: 'Side Plank with Twist', detail: '3 x 10/sisi' },
        { name: 'Star', detail: '3 x 20 detik/sisi' },
        { name: 'Teaser with Twist', detail: '3 x 8 rep' },
        { name: 'Swan Dive', detail: '3 x 6 rep' },
        { name: 'Control Balance', detail: '3 x 6 rep' }
      ]},
      { day: 'Kamis', focus: 'Spine & Back', exercises: [
        { name: 'Rocking', detail: '3 x 8 rep' },
        { name: 'Boomerang', detail: '3 x 5 rep' },
        { name: 'Scissors in Air', detail: '3 x 8/kaki' },
        { name: 'Bicycle in Air', detail: '3 x 10/sisi' },
        { name: 'Swimming (Fast)', detail: '3 x 45 detik' }
      ]},
      { day: 'Jumat', focus: 'Legs Power', exercises: [
        { name: 'Side Kick Kneeling', detail: '3 x 12/kaki' },
        { name: 'Grande Battement', detail: '3 x 10/kaki' },
        { name: 'Standing Splits', detail: '3 x 8/kaki' },
        { name: 'Pilates Squat', detail: '3 x 15 rep' },
        { name: 'Relevé Plié', detail: '3 x 12 rep' }
      ]},
      { day: 'Sabtu', focus: 'Advanced Flow', exercises: [
        { name: 'Teaser 1, 2, 3', detail: '4 x 5 rep' },
        { name: 'Snake & Twist', detail: '3 x 6/sisi' },
        { name: 'Hip Circles (Advanced)', detail: '3 x 8/arah' },
        { name: 'Push-up (Pilates Style)', detail: '3 x 10 rep' },
        { name: 'Final Roll Down', detail: '3 x 6 rep' }
      ]},
      { day: 'Minggu', focus: 'Istirahat', rest: true }
    ]
  }
};

// Backward compatibility alias (old code referenced `workouts` as home-only)
const workouts = workoutPrograms.home;

