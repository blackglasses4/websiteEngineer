Dane do bazy danych
Użytkownicy
INSERT INTO users (id, first_name, last_name, username, email, hashed_password, is_admin)
VALUES
(1, 'admin123', 'admin123', 'admin123', 'admin123@gmail.com', '$2b$12$p.IppCVYPKdYCAxuqoIOiu0cbNdOq8jWgS3xR5tKMcNTk/8U2Jq2O', true),
(2, 'user123', 'user123', 'user123', 'user@gmail.com', '$2b$12$EQqHWPdpknuehEMUWIQ.fO5tnRAzloEvJFhCYXm4GBHJFPjU1/bSq', false);

Produkty

INSERT INTO sklep.products (id, category, gender, name, popular, new_price, old_price, description, picture, sizes, colors, material)
VALUES
(1, 'shirt', 'woman', 'Koszulka sportowa', true, 50, 80, 'Lekka koszulka sportowa, idealna na treningi.', '/static/shirt_women1.jpg', 'M,L,XL,XS', 'black,white,blue,red,navy', 'poliester'),
(2, 'shirt', 'woman', 'Koszulka sportowa', true, 35, 80, 'Lekka koszulka sportowa, idealna na treningi.', '/static/shirt_women2.jpg', 'S,M,L,XL', 'black,white,blue,red', 'poliester'),
(3, 'shirt', 'woman', 'Koszulka treningowa', false, 45, 90, 'Koszulka do intensywnych treningów, przewiewna i elastyczna.', '/static/shirt_women3.jpg', 'S,M,L', 'grey,pink,green', 'cotton_wool'),
(4, 'shirt', 'woman', 'Koszulka do tenisa', true, 65, 100, 'Koszulka do intensywnych treningów na tenis, przewiewna i elastyczna.','/static/shirt_women4.jpeg', 'S,M,L,XL', 'black,navy,purple', 'poliester'),
(5, 'shirt', 'woman', 'Koszulka fitness', true, 45, 90, 'Koszulka fitnessowa z oddychającego materiału, zapewnia wygodę podczas intensywnych treningów.','/static/shirt_women5.jpg', 'S,M,L,XL', 'black,red,blue', 'poliester'),
(6, 'shirt', 'woman', 'Koszulka do jogi', false, 35, 70, 'Koszulka do jogi, wygodna i elastyczna, wykonana z naturalnych materiałów.','/static/shirt_women6.jpg', 'S,M,L', 'white,grey,lime', 'cotton_wool'),
(7, 'shirt', 'woman', 'Koszulka do biegania', true, 50, 100, 'Lekka koszulka do biegania, z materiału odprowadzającego wilgoć, zapewnia komfort podczas treningu.','/static/shirt_women7.jpg', 'S,M,L,XL', 'purple,blue,yellow,salmon,lime', 'elastan'),
(8, 'shirt', 'man', 'Koszulka treningowa męska', true, 55, 100, 'Lekka i przewiewna koszulka sportowa idealna na intensywne treningi.', '/static/shirt_men1.jpg', 'M,L,XL,XXL', 'navy blue,gray,white', 'poliester'),
(9, 'shirt', 'man', 'Koszulka casual z krótkim rękawem', false, 35, 60, 'Uniwersalna koszulka bawełniana idealna na co dzień.', '/static/shirt_men2.jpg', 'S,M,L,XL', 'black,green,red,blue', 'cotton_wool'),
(10, 'shirt', 'man', 'Koszulka termoaktywna męska', true, 70, 120, 'Zaawansowana koszulka termoaktywna, idealna na chłodniejsze dni i aktywności outdoorowe.', '/static/shirt_men3.jpg', 'M,L,XL,XXL', 'black,blue,orange', 'cotton_wool'),
(11, 'shirt', 'man', 'Koszulka sportowa na ramiączkach', false, 30, 50, 'Koszulka bez rękawów idealna na siłownię lub w ciepłe dni.', '/static/shirt_men4.jpg', 'S,M,L', 'gray,black,yellow', 'poliester'),
(12, 'shirt', 'man', 'Koszula komercyjna', true, 150, 300, 'Koszula sportowa idealna do biegania w chłodniejsze dni. Lekka i oddychająca.', '/static/shirt_men5.jpg', 'M,L,XL', 'black,grey,blue', 'spandex');


INSERT INTO sklep.products (id, category, gender, name, popular, new_price, old_price, description, picture, sizes, colors, material)
VALUES
(13, 'jacket', 'man', 'Kurtka treningowa', false, 150, 300, 'Kurtka sportowa idealna do biegania w chłodniejsze dni. Lekka i oddychająca.', '/static/jacket_men1.png', 'M,L,XL', 'black,grey,blue', 'nylon'),
(14, 'jacket', 'man', 'Kurtka', true, 120, 240, 'Kurtka windbreaker do ochrony przed wiatrem, świetna na lekkie treningi na świeżym powietrzu.', '/static/jacket_men2.png','M,L,XL', 'black,green,navy', 'poliamid'),
(15, 'jacket', 'man', 'Kurtka sportowa z kapturem', true, 180, 350, 'Kurtka sportowa z funkcjonalnym kapturem, doskonała do aktywności na świeżym powietrzu w każdą pogodę.','/static/jacket_men3.png', 'S,M,L,XL', 'black,grey,red', 'poliester'),
(16, 'jacket', 'man', 'Kurtka polarowa', true, 130, 260, 'Polarowa kurtka sportowa do biegania w zimne dni. Ciepła i wygodna.', '/static/jacket_men4.png', 'M,L,XL', 'navy,lime,darkgreen', 'polar'),
(17, 'jacket', 'man', 'Kurtka puchowa sportowa', true, 250, 500, 'Wysokiej jakości kurtka puchowa, idealna na zimowe treningi na świeżym powietrzu.', '/static/jacket_men5.png', 'M,L,XL', 'black,grey,darkcyan', 'puch'),
(18, 'jacket', 'woman', 'Kurtka puchowa z kapturem', true, 270, 540, 'Ciepła i lekka kurtka puchowa z kapturem, doskonała na chłodne dni.', '/static/jacket_women1.jpg', 'S,M,L,XL', 'black,darkcyan,blue', 'puch'),
(19, 'jacket', 'woman', 'Kurtka narciarska damska', false, 320, 640, 'Wodoodporna kurtka narciarska z wieloma kieszeniami i regulowanym kapturem.', '/static/jacket_women2.jpg', 'M,L,XL', 'red,purple,navy,grey', 'poliester'),
(20, 'jacket', 'woman', 'Kurtka softshell damska', true, 180, 360, 'Praktyczna kurtka softshell, idealna na aktywności outdoorowe w wietrzne dni.', '/static/jacket_women3.jpg', 'S,M,L', 'pink,turquoise,gray,green', 'spandex'),
(21, 'jacket', 'woman', 'Kurtka przejściowa damska', false, 150, 300, 'Lekka kurtka przejściowa, idealna na wiosnę i jesień.', '/static/jacket_women4.jpg', 'S,M,L,XL', 'green,darkcyan,salmon', 'cotton_wool'),
(22, 'jacket', 'woman', 'Kurtka zimowa z futrem', true, 400, 800, 'Elegancka i ciepła kurtka zimowa z odpinanym futrem przy kapturze.', '/static/jacket_women5.jpg', 'S,M,L', 'black,salmon,darkgreen', 'poliester'),
(23, 'jacket', 'woman', 'Kurtka przeciwdeszczowa damska', false, 120, 240, 'Lekka kurtka przeciwdeszczowa z regulowanym kapturem, idealna na deszczowe dni.', '/static/jacket_women6.jpg', 'S,M,L,XL', 'yellow,blue,red,grey,lime', 'poliester'),
(24, 'jacket', 'woman', 'Kurtka pikowana damska', true, 200, 400, 'Stylowa kurtka pikowana, odpowiednia na chłodne poranki i wieczory.', '/static/jacket_women7.jpg', 'S,M,L,XL', 'darkgreen,gray,pink,black,blue', 'poliester');


INSERT INTO sklep.products (id, category, gender, name, popular, new_price, old_price, description, picture, sizes, colors, material)
VALUES
(25, 'pants', 'man', 'Legginsy sportowe kompresyjne', true, 120, 200, 'Zaawansowane legginsy kompresyjne wspomagające regenerację mięśni, idealne na siłownię i treningi biegowe.', '/static/pants_men1.jpg', 'S,M,L,XL,XXL', 'black,lime,red,yellow', 'poliester'),
(26, 'pants', 'man', 'Strój do surfowania', false, 150, 300, 'Idealny strój męski do surfowania, idealny do wody.','/static/pants_men2.jpg', 'M,L,XL,XXL', 'navy,darkcyan,yellow,black', 'poliester'),
(27, 'pants', 'man', 'Spodnie do biegania', true, 110, 220, 'Elastyczne i lekkie spodnie, zaprojektowane z myślą o biegaczach, zapewniają swobodę ruchów i komfort.', '/static/pants_men3.jpg', 'S,M,L,XL', 'grey,lime,turquoise,black', 'poliester'),
(28, 'pants', 'man', 'Spodnie sportowe z kieszeniami', false, 140, 280, 'Funkcjonalne spodnie z kieszeniami na drobiazgi, idealne do treningów na świeżym powietrzu.', '/static/pants_men4.jpg', 'S,M,L,XL,XXL', 'purple,blue,darkgreen,grey,navy', 'poliester'),
(29, 'pants', 'man', 'Spodnie do boksu', false, 130, 260, 'Stylowe spodnie do boksu, idealne do aktywności na siłowni lub na ringu.', '/static/pants_men5.jpg', 'S,M,L,XL', 'red,black,yellow,blue,grey', 'poliester'),
(30, 'pants', 'man', 'Spodnie do pływania', false, 130, 260, 'Funkcjonalne i wygodne spodnie do pływania dla mężczyzn, zaprojektowane z myślą o komforcie i wydajności w wodzie.', '/static/pants_men6.jpg', 'S,M,L,XL', 'red,black,white,purple,grey', 'poliester'),
(31, 'pants', 'woman', 'Spodnie sportowe z wysokim stanem', true, 110, 220, 'Stylowe i wygodne spodnie sportowe z wysokim stanem, doskonałe do treningów fitness i jogi. Wykonane z elastycznego materiału, zapewniają swobodę ruchów i idealne dopasowanie.', '/static/pants_women1.jpg', 'XS,S,M,L,XL', 'black,lime,pink,darkcyan,coral', 'elastan'),
(32, 'pants', 'woman', 'Spodnie treningowe z kieszeniami', false, 130, 260, 'Funkcjonalne spodnie treningowe z kieszeniami, idealne do biegania i aktywności na świeżym powietrzu. Materiał oddychający i szybkoschnący.', '/static/pants_women2.jpg', 'S,M,L,XL', 'grey,blue,purple', 'poliester'),
(33, 'pants', 'woman', 'Spodnie sportowe termiczne', true, 150, 300, 'Ciepłe i wygodne spodnie termiczne, idealne na treningi w chłodniejsze dni. Wykonane z materiału utrzymującego ciepło i odprowadzającego wilgoć.', '/static/pants_women3.jpg', 'M,L,XL', 'darkgreen,navy,red,grey,black', 'cotton_wool'),
(34, 'pants', 'woman', 'Spodnie sportowe wielokolorowe', false, 120, 240, 'Wyraziste spodnie sportowe w wielokolorowym wzorze, które dodadzą energii każdemu treningowi. Materiał elastyczny i oddychający.', '/static/pants_women4.jpg', 'XS,S,M,L', 'yellow,turquoise,pink', 'poliester'),
(35, 'pants', 'woman', 'Spodnie dresowe slim fit', true, 140, 280, 'Nowoczesne spodnie dresowe o kroju slim fit, idealne do codziennych aktywności i lekkich treningów. Wyposażone w elastyczny pas i zwężane nogawki.', '/static/pants_women5.jpg', 'S,M,L,XL', 'white,darkcyan,black', 'elastan'),
(36, 'pants', 'woman', 'Spodnie sportowe na jogę', false, 100, 200, 'Miękkie i elastyczne spodnie stworzone z myślą o jodze i pilatesie. Doskonale dopasowują się do sylwetki i zapewniają pełną swobodę ruchów.', '/static/pants_women6.jpg', 'XS,S,M,L,XL', 'lime,purple,navy', 'elastan');


INSERT INTO sklep.products (id, category, gender, name, popular, new_price, old_price, description, picture, sizes, colors, material)
VALUES
(37, 'hat', 'woman', 'Czapka sportowa na zimę', true, 50, 100, 'Ciepła i wygodna czapka sportowa, idealna na treningi w zimowych warunkach. Wykonana z materiałów zapewniających izolację i komfort.', '/static/hat_women1.jpg', 'S,M,L', 'black,white,navy,grey', 'polar'),
(38, 'hat', 'woman', 'Czapka sportowa do biegania', false, 45, 90, 'Lekka i oddychająca czapka sportowa, doskonała na biegi i treningi w chłodne dni. Zapewnia wygodę i swobodę ruchów.', '/static/hat_women2.jpg', 'S,M,L', 'grey,red,darkgreen,pink,white', 'polar'),
(39, 'hat', 'woman', 'Czapka sportowa z daszkiem', true, 40, 80, 'Sportowa czapka z daszkiem, idealna na treningi w słoneczne dni. Chroni oczy przed słońcem, a materiał zapewnia dobrą wentylację.', '/static/hat_women3.jpg', 'S,M,L', 'white,blue,lime,grey,turquoise', 'poliester'),
(40, 'hat', 'woman', 'Czapka treningowa termiczna', false, 60, 120, 'Cienka, termiczna czapka treningowa. Odpowiednia na intensywne ćwiczenia na świeżym powietrzu w chłodniejsze dni.', '/static/hat_women4.jpg', 'M,L,XL', 'turquoise,purple,yellow,grey', 'poliester'),
(41, 'hat', 'woman', 'Opaska sportowa', true, 55, 110, 'Uniwersalna opaska sportowa, nadająca się do różnych aktywności, takich jak bieganie, fitness czy trekking. Lekka i funkcjonalna.', '/static/hat_women5.jpg', 'S,M,L', 'pink,navy,black,white', 'elastan'),
(42, 'hat', 'man', 'Czapka sportowa zimowa', true, 60, 120, 'Ciepła czapka sportowa idealna na treningi w zimowe dni. Zapewnia komfort i ochronę przed zimnem.', '/static/hat_men1.jpg', 'M,L,XL', 'black,grey,darkcyan,salmon', 'elastan'),
(43, 'hat', 'man', 'Czapka sportowa termiczna', false, 50, 100, 'Czapka termiczna zaprojektowana z myślą o treningach w chłodne dni. Lekka i oddychająca, zapewnia ciepło i odprowadzenie wilgoci.','/static/hat_men2.jpg', 'M,L,XL', 'navy,grey', 'poliester'),
(44, 'hat', 'man', 'Czapka sportowa z daszkiem', true, 40, 80, 'Sportowa czapka z daszkiem idealna na treningi na świeżym powietrzu. Chroni oczy przed słońcem i zapewnia wentylację.','/static/hat_men3.jpg', 'S,M,L', 'white,red,lime,turquoise,darkcyan', 'cotton_wool'),
(45, 'hat', 'man', 'Czapka sportowa lekka', false, 35, 70, 'Lekka czapka sportowa wykonana z przewiewnych materiałów. Idealna na cieplejsze dni i treningi w słońcu.','/static/hat_men4.jpg',  'M,L,XL', 'yellow,purple,black', 'poliester'),
(46, 'hat', 'man', 'Opaska sportowa', true, 30, 60, 'Elastyczna opaska sportowa idealna na treningi biegowe i fitness. Zapewnia wygodę i dobrze odprowadza pot.', '/static/hat_men5.jpg', 'S,M,L', 'grey,navy,turquoise,black', 'cotton_wool');


INSERT INTO sklep.products (id, category, gender, name, popular, new_price, old_price, description, picture, sizes, colors, material)
VALUES
(47, 'outfit', 'woman', 'Strój bokserski', true, 150, 300, 'Profesjonalny strój bokserski wykonany z elastycznego materiału, zapewniający pełną swobodę ruchów i komfort podczas treningów bokserskich.', '/static/outfit_women1.jpg', 'S,M,L,XL', 'black,red,blue', 'poliester'),
(48, 'outfit', 'woman', 'Strój narciarski', false, 400, 800, 'Wodoodporny i ciepły strój narciarski z technologią oddychającą, zaprojektowany do jazdy na nartach w zimowych warunkach.', '/static/outfit_women2.jpg', 'S,M,L,XL', 'red,black,white', 'nylon'),
(49, 'outfit', 'woman', 'Strój do jogi', true, 120, 240, 'Strój do jogi wykonany z oddychającego materiału, elastyczny i wygodny, zapewnia komfort i pełną swobodę podczas ćwiczeń.', '/static/outfit_women3.jpg', 'XS,S,M,L', 'green,grey,black', 'elastan'),
(50, 'outfit', 'woman', 'Strój do jogi z kosmicznym wzorkiem', true, 120, 240, 'Kolorowy strój do jogi wykonany z oddychającego materiału, elastyczny i wygodny, zapewnia komfort i pełną swobodę podczas ćwiczeń.', '/static/outfit_women4.jpg', 'S,M,L', 'blue,pink', 'elastan'),
(51, 'outfit', 'woman', 'Strój do pilatesu', false, 110, 220, 'Strój do pilatesu zaprojektowany z myślą o elastyczności i wygodzie. Wykonany z materiałów, które umożliwiają swobodne wykonywanie ćwiczeń.', '/static/outfit_women5.jpg', 'S,M', 'black,gray', 'elastan'),
(52, 'outfit', 'woman', 'Strój gimnastyczny', true, 130, 260, 'Strój gimnastyczny, który zapewnia elastyczność i wygodę, idealny do ćwiczeń gimnastycznych, oparty na technologiach odprowadzania wilgoci.', '/static/outfit_women6.jpg', 'M,L', 'green,pink', 'elastan'),
(53, 'outfit', 'woman', 'Strój baletowy', true, 90, 180, 'Elegancki strój baletowy, wykonany z elastycznego materiału, zaprojektowany z myślą o baletnikach i miłośniczkach tańca.', '/static/outfit_women7.jpg', 'S,M', 'white,black', 'cotton_wool'),
(54, 'outfit', 'woman', 'Strój do sztuk walki', true, 42, 85, 'Wygodny strój z długim rękawem, odpowiedni do aktywności fizycznej w sportach sztuk walki.', '/static/outfit_women11.jpg', 'S,M', 'black,red', 'spandex'),
(55, 'outfit', 'man', 'Strój do sztuk walki', true, 150, 300, 'Wygodny strój z długim rękawem, odpowiedni do aktywności fizycznej w sportach sztuk walki.', '/static/outfit_men9.jpg', 'M,L', 'black,blue', 'spandex'),
(56, 'outfit', 'woman', 'Strój do snowboard', true, 150, 300, 'Wysokiej jakości strój snowboardowy, zapewniający komfort i ciepło podczas jazdy na stoku. Wykonany z wodoodpornego materiału, idealny do zimowych warunków. Dzięki swojej elastyczności, umożliwia pełną swobodę ruchów, zapewniając wygodę w snowboardzie.', '/static/outfit_women8.jpg', 'M,L', 'black,blue', 'cotton_wool'),
(57, 'outfit', 'woman', 'Strój baletowy ze spódniczką', true, 90, 180, 'Elegancki strój baletowy ze spódniczką, wykonany z elastycznego materiału, zaprojektowany z myślą o baletnikach i miłośniczkach tańca.', '/static/outfit_women9.jpg', 'S,M', 'pink,white', 'elastan'),
(58, 'outfit', 'man', 'Strój bokserski', true, 150, 300, 'Profesjonalny strój bokserski wykonany z elastycznego materiału, zapewniający pełną swobodę ruchów i komfort podczas treningów bokserskich.', '/static/outfit_men1.jpg', 'M,L', 'black,red', 'nylon'),
(59, 'outfit', 'man', 'Strój narciarski', false, 400, 800, 'Wodoodporny i ciepły strój narciarski z technologią oddychającą, zaprojektowany do jazdy na nartach w zimowych warunkach.', '/static/outfit_men2.jpg', 'L,XL', 'black,blue', 'nylon'),
(60, 'outfit', 'man', 'Strój do jogi', true, 120, 240, 'Strój do jogi wykonany z oddychającego materiału, elastyczny i wygodny, zapewnia komfort i pełną swobodę podczas ćwiczeń.', '/static/outfit_men3.jpg', 'M,L', 'gray,black', 'cotton_wool'),
(61, 'outfit', 'man', 'Strój do snowboard', true, 150, 300, 'Wysokiej jakości strój snowboardowy, zapewniający komfort i ciepło podczas jazdy na stoku. Wykonany z wodoodpornego materiału, idealny do zimowych warunków. Dzięki swojej elastyczności, umożliwia pełną swobodę ruchów, zapewniając wygodę na snowboardzie.', '/static/outfit_men4.jpg', 'M,L', 'blue,gray', 'cotton_wool'),
(62, 'outfit', 'man', 'Strój do pływania', true, 150, 300, 'Wysokiej jakości strój do pływania, zaprojektowany z myślą o intensywnych treningach i rekreacyjnym pływaniu. Strój zapewnia doskonałą elastyczność i wygodę, umożliwiając swobodny ruch w wodzie.', '/static/outfit_men5.jpg', 'M,L', 'black,green', 'poliester'),
(63, 'outfit', 'man', 'Strój do piłki nożnej', true, 180, 360, 'Profesjonalny strój piłkarski zapewniający komfort i swobodę ruchów podczas gry. Wykonany z lekkiego, oddychającego materiału, idealny do intensywnych meczów oraz treningów. Strój wyposażony w elastyczne panele, które poprawiają dopasowanie.', '/static/outfit_men6.jpg', 'M,L', 'blue,red', 'poliamid'),
(64, 'outfit', 'man', 'Strój do hokeja', false, 250, 500, 'Strój hokejowy wykonany z wytrzymałych materiałów, które zapewniają ochronę, komfort i elastyczność podczas gry. Zawiera specjalne wzmocnienia w newralgicznych miejscach, takich jak ramiona i kolana.', '/static/outfit_men7.jpg', 'L,XL', 'black,gray', 'nylon'),
(65, 'outfit', 'man', 'Strój do szermierki', true, 350, 700, 'Profesjonalny strój do szermierki dla mężczyzn, zaprojektowany z myślą o pełnej ochronie i komforcie podczas rywalizacji. Wykonany z wytrzymałych materiałów, takich jak kevlar i poliester, gwarantuje doskonałą elastyczność i bezpieczeństwo.', '/static/outfit_men8.jpg', 'M,L', 'black,white', 'poliester'),
(66, 'outfit', 'woman', 'Strój do szermierki', true, 350, 700, 'Profesjonalny strój do szermierki dla kobiet, zapewniający pełną swobodę ruchów oraz maksymalną ochronę. Wykonany z lekkich, odpornych na uszkodzenia materiałów, zapewniających komfort i bezpieczeństwo podczas walki.', '/static/outfit_women10.jpg', 'S,M', 'white,black', 'poliester'),
(67, 'outfit', 'woman', 'Spódniczka do ćwiczeń', true, 35, 60, 'Sportowa spódniczka wykonana z lekkiego, elastycznego materiału.', '/static/skirt_women1.jpg', 'S,M,L,XL,XXL,XS', 'white,lime,red,green,pink', 'poliester');

