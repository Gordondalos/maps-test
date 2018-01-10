Видео как это работает
https://www.youtube.com/watch?v=KSG-ToS_clE&feature=youtu.be

Функции для фронтэнда:

Главная страница:

карта с отметками городов;
список городов (только названия);
под каждым городам список районов (название и количество жителей);
по умолчанию сортировка городов по названию;
сортировка по районам внутри города по названию;
возможность отсортировать города по количеству жителей в нём (сумма населения по районам города).
Страница редактирования: Добавление, редактирование, удаление городов (название, координаты) и районов (название и население).

В коде приложения должна быть константа (uuid, 36 символов), к ней привязываются все города и по ней выдаётся список городов. Т.е. это некий ключ.

API
JSONRPC v2.0

Адрес: http://95.213.207.35:18000/api/

Список городов с координатами и данными по районам:
get_cities(key)

Параметры:

key - str, уникальный ключ для всего API, uuid, 36 символов.
Ответ:

Список структур

[
    {
        city_id - int, id города
        city_name - str, название города
        lat - float, широта
        lon - float, долгота
        districts - список:
            [
                {
                    district_id - int, id района
                    name - str, название района
                    population - int, население района
                }
            ]
    }
]
Пример json-запроса:

{"method": "get_cities", "jsonrpc":"2.0", "id":1, "params": 
    {
    	"key": "7c4073d1-ffd0-4e32-bd56-03829dc67126"

    }
}
Создание города
create_city(key, name, lat, lon)

Параметры:

key - str, уникальный ключ для всего API, uuid, 36 символов.
name - str, название города
lat - float, широта
lon - float, долгота
Ответ:

city_id

Изменение города
set_city(key, city_id, name, lat, lon)

Параметры:

key - str, уникальный ключ для всего API, uuid, 36 символов.
city_id - int, id города
name - str, название города
lat - float, широта
lon - float, долгота
Ответ:

city_id

Удаление города
delete_city(key, city_id)

Параметры:

key - str, уникальный ключ для всего API, uuid, 36 символов.
city_id - int, id города
Ответ:

city_id

Создание района
create_district(key, city_id, name, population)

Параметры:

key - str, уникальный ключ для всего API, uuid, 36 символов.
city_id - int, id города
name - str, название района
population - int, население
Ответ:

district_id

Изменение района
set_district(key, district_id, name, population)

Параметры:

key - str, уникальный ключ для всего API, uuid, 36 символов.
district_id - int, id района
name - str, название района
population - int, население
Ответ:

district_id

Удаление района
delete_district(key, district_id)

Параметры:

key - str, уникальный ключ для всего API, uuid, 36 символов.
district_id - int, id района
Ответ:

district_id