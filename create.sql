drop schema fullcycle cascade;
create schema fullcycle;


create table fullcycle.event (
    event_id uuid,
    description text,
    price numeric,
    capacity integer,
    vacancies_purchased integer
);

create table fullcycle.vacancy_filled
(
    vacancy_filled_id uuid,
    ticket_id uuid,
    event_id uuid,
    status text
);

create table fullcycle.ticket (
    ticket_id uuid,
    event_id uuid,
    email text,
    status text
);

create table fullcycle.transaction (
    transaction_id uuid,
    ticket_id uuid,
    event_id uuid,
    price numeric,
    status text,
    tid text
);



insert into fullcycle.event (event_id, description, price, capacity, vacancies_purchased) values ('f9e7d6b4-1a20-4e7c-bc4a-9e9b75f0c741', 'fuba 10/10/2023 22:00', 300, 100000, 0);
insert into fullcycle.event (event_id, description, price, capacity, vacancies_purchased) values ('b5a1faf6-ef57-4ede-b491-06d9ca0257bc', 'fufu 10/11/2023 22:00', 300, 100000, 100000);