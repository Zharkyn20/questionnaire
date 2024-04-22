### Installation
- clone git repo 
```
git clone https://github.com/Zharkyn20/reservation_test_task.git
```
- move to reservation_test_task
```
cd reservation_test_task
```
- install requirements
```
pip install -r requirements.txt
```
- make migrations
```
python3 manage.py makemigrations
```
```
python3 manage.py migrate
```
- populate db (creates 50 rentals, and 250 reservations)
- also creates superuser with username: 'admin', password: 'admin'
```
python3 manage.py populate
```
- run script
```
python3 manage.py runserver
```
