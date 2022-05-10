var persons = window.localStorage.getItem('persons') ? JSON.parse(window.localStorage.getItem('persons')) : []; 
var index;																	// Объявляем глобальную переменную Index (служит для удаления контактов) через функцию

function saveContact(){ 													//Функция по сохранению введенных значений (Срабатывает при нажатии)
	let fam = document.getElementById("lastName").value; 					// объявляем переменные где им присваиваем введенные значения 
	let nam = document.getElementById("firstName").value;					// в поля input
	let birth = document.getElementById("birthday").value;
	let num = document.getElementById("number").value;
	let sext = document.getElementById("sex").value;
	let person = { 															// Создаем объект Person в который добавляем все введенне значения 
		lastName : fam,
		firstName : nam,
		birthday : birth,
		number : num,
		sex : sext,
		id : persons.length + 1};                                       	// Требуется редактирование, генерирование id должно производиться по другому!!!!!!!!!!!!!!
	persons.push(person); 													// Созданный объект Person добавляем в массив Persons
																			// После сохранения данных сразу ощищаем поля input																		// Вызываем сразу функцию по выводу введенных данных в таблицу														
	console.log(person);
	window.localStorage.setItem('persons', JSON.stringify(persons));
	clearAll(); 
}


///////////////Функция по очистке значений в input /////////////////////

function clearAll() { 														//Функция стирает все введенные значения value в input
	document.getElementById("lastName").value = " ";
	document.getElementById("firstName").value = " ";
	document.getElementById("birthday").value = " ";
	document.getElementById("number").value = " ";
	document.getElementById("sex").value = " ";
};

															 															

////////////// Функция по выборочному удалению контактов //////////////////// 

function deleteContact(){
	if(index == undefined){
	return;
	}
	persons.splice(index, 1);
	console.log(index);
	window.localStorage.setItem('persons' , JSON.stringify(persons));	
	index = undefined;
	tableCreate();
}

//////////// Функция по выводу сохраненных контактов в динамическую таблицу /////////////////
function tableCreate(){
	let pagination = document.querySelector('#pagination');
	pagination.innerHTML = null;	
	let notesOnPage = 3;
	let countOfItems = Math.ceil(persons.length / notesOnPage);
	let items = [];
	for (let i = 1; i <= countOfItems; i++) {
		let li = document.createElement('li');
		li.innerHTML = i;
		pagination.appendChild(li);
		items.push(li);
	}
	for (let item of items) {
		items[0].click();	
		item.addEventListener('click', function() {
			let pageNumm = +this.innerHTML;
			console.log(pageNumm);
			let start = (pageNumm - 1) * notesOnPage;
			let end = start + notesOnPage;
			let notes = persons.slice(start, end);
			console.log(notes);
			let table = document.getElementById('tableAllContact'); 			// Объявляем переменную "table", которая будет ссылаться по id на саму таблицу 
			table.innerHTML = null;												//	присваиваем переменной "table" тип данных "null" для того чтобы не рисовалось несколько таблиц(при повторном вызове функции предудущая таблица стирается)
			let columnNames = Object.getOwnPropertyNames(persons[0]);			// Объявляем переменную которой  передаем массив со всеми свойствами (Получаем все названия строк = Firstname, LastName и тд.)
			columnNames.forEach(columnName => { 								//Через метод forEach создаем верхний ряд таблицы с названиями столбцов
				let th = document.createElement('th');
				th.innerHTML = columnName;
				table.appendChild(th);
			});
			let body = document.createElement('tbody');
			notes.forEach( person => {
				let tr = document.createElement('tr');
				tr.addEventListener('click', function dad (){
					tr.id = person.id;
					index =  persons.indexOf(person);
					console.log(index);
					document.getElementById(tr.id).style.backgroundColor="white";
					var buttonDel = document.createElement('button');
					buttonDel.innerHTML = '<img class="icon_remove" src="./img/remove.png" alt="remove" onclick="deleteContact()">';
					tr.appendChild(buttonDel);
					tr.removeEventListener('click', dad);
				});
				columnNames.forEach(columnName => {
					let td = document.createElement('td');
					td.innerHTML = person[columnName];
					tr.appendChild(td);
				});
				body.appendChild(tr);
			});
			table.appendChild(body);
		});
	}
}

//////////////// Функция поиска контактов по номеру телефона  и их редактированию ///////////////

function searchContact(){ 
	var bym = document.getElementById('search').value;
	console.log(bym);
	var ser = persons.filter(el => el.Number === bym);					// Осуществляем поиск по номеру телефона
	console.log(ser);
	if(ser.length > 0){									
		var table2 = document.getElementById('tableSearchContact'); 	// Объявляем переменную "table", которая будет ссылаться по id на саму таблицу 
	 	table2.innerHTML = null;										//	присваиваем переменной "table" тип данных "null" для того чтобы не рисовалось несколько таблиц(при повторном вызове функции предудущая таблица стирается)
		var columnNames = Object.getOwnPropertyNames(persons[0]);		// Объявляем переменную которой  передаем массив со всеми свойствами (Получаем все названия строк = Firstname, LastName и тд.)
		columnNames.forEach(columnName => { 							//Через метод forEach создаем верхний ряд таблицы с названиями столбцов
			var th = document.createElement('th');						// th - заголовок строки таблицы и выделен жирным текстом
			th.innerHTML = columnName;								
			table2.appendChild(th);
			})
		var body = document.createElement('tbody');						// создаем тело таблицы
		ser.forEach(ser => {
			var tr = document.createElement('tr'); 						// Создаем строку в таблиц
				tr.id = ser.id;											// Присваиваем id объекту который ищем через поиск
				console.log(tr.id);	
				console.log(ser.id);					
			columnNames.forEach(columnName => {
				var td = document.createElement('td');
				td.innerHTML = ser[columnName];
				td.id = (columnName);									// Присваиваем id ячейки для каждого проперти
				console.log(td.id);							
				tr.appendChild(td);
				});
			body.appendChild(tr);
			});
		table2.appendChild(body);

		var tds = document.querySelectorAll('td');						//Объявляем переменную через которую обращаемся ко всем ячекам в таблицу(в функции IF)
		for (var i = 0; i < tds.length; i++) {							//Через цикл фор перебираем все ячейки в таблице
			tds[i].addEventListener('click', function func() {			// Добавляем к каждой ячейке обработчки событий, при клике вызываем функцию
				var input = document.createElement('input');			// Объявляем переменную "input", которая при нажатии на ячейку создаёт элемент input
				input.value = this.innerHTML;							// Значение элемента input присваиваем то значение что уже находися в ячейке (на которую вы уже нажали)
				console.log(this.innerHTML);
				input['data-property-name'] = this.id;					// Получаем id property objekta к которому мы обратились нажатием
				console.log(this.id);
				input['data-row-id'] = this.parentNode.id;				// Получаем id самого объекта (Добавили в самом начале такую проперти)
				this.innerHTML = '';									// Присваиваем нулевое значение в inpute на который мы нажали(this)
				this.appendChild(input);								// Та ячейка на которую нажали аппедит инпут
				var td = this;											
					input.addEventListener('blur', function() {			// Добавляем событие в инпут что при потере фокуса вызывается функция
					td.innerHTML = this.value;							// Так как this уже относится к инпуту, а не к ячейке, то ячейке присваимваем значение введенное в инпут
					td.addEventListener('click', func);					// Добавляем еще раз к ячейке функцию по клику, чтобы была возможность редактировать несколько раз
					console.log(this['data-property-name']);
					console.log(this['data-row-id']);
					var sok = persons.find(el => el.id == this['data-row-id']); 			// Осуществляем поиск по массиву того объекта
					sok[this['data-property-name']] = this.value;												
					window.localStorage.setItem('persons' , JSON.stringify(persons));		// Пересохраняем изменения обратно в массив persons
				});
			this.removeEventListener('click', func);										// избавляемся от множественного добавления инпутов в ячейку
			});
		}
	}
else(alert("Такого номера не существует"));										// В случае если номера не найдено, выводится сообщение об этом
}

/////////////// Функция по удалению всех контактов //////////////////

function deleteAllContact(){													// Функция удаляет все контакты изз Lokalstorage, при нажатии также удаляется всё с экрана
localStorage.clear();
persons = [];
let table = document.getElementById('tableAllContact'); 						// Объявляем переменную "table", которая будет ссылаться по id на саму таблицу 
table.innerHTML = null;
tableCreate();
}


////////////// Функция по загрузке контактов из файла ////////////////

function showFile(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);                               						 //чтоние содержимого файла Blob
    reader.onload = function() {
        persons = JSON.parse(reader.result);                					 // атребут result выдает результат метода readAsText в виде строки
        window.localStorage.setItem('persons', JSON.stringify(persons));
    	};

    reader.onerror = function() {
        console.log(reader.error);
    }; 
}

///////////// Функция по выгрузке контактов в файл формата JSON //////////////////

function textToFile (text, name) {
	const b = new Blob([text], { type: 'text/plain' });								//Создаём класс Blob
	const url = window.URL.createObjectURL(b);										//
	const a = document.createElement('a');											//	
	a.href = url;																	//
	a.download = name || 'text.txt';												//
	a.type = 'apllication/JSON';													//
	setTimeout(() => window.URL.revokeObjectURL(url), 10000);						//
	a.click();																		//
}

function textToFile2(){
textToFile(JSON.stringify(persons), 'file.JSON');
}

