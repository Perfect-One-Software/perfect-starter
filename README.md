# Kolekcja Zwierząt Egzotycznych

## Opis projektu

Aplikacja "Kolekcja Zwierząt Egzotycznych" jest projektem do zarządzania danymi dotyczącymi zwierząt egzotycznych trzymanych w specjalnych ośrodkach hodowlanych. Projektem tym można zarządzać różnymi aspektami kolekcji, takimi jak dane o zwierzętach, ośrodkach hodowlanych, pracownikach oraz wydarzeniach medycznych z nimi związanych.

- Baza danych: SQLite
- ORM (Object-Relational Mapping): Prisma
- Framework do budowy interfejsu użytkownika: Next.js
- Narzędzie do zarządzania zależnościami: Yarn

## Rozwój projektu

Ten projekt jest rozwijany na serwisie GitHub, a zadania do wdrożenia oraz inne ważne informacje znajdziesz w sekcji [Issues](https://github.com/twoja-nazwa-uzytkownika/twoj-projekt/issues). Możesz tam zgłaszać nowe pomysły, błędy lub zadania do wykonania.

## Struktura bazy danych

Projekt wykorzystuje [Prisma](https://www.prisma.io/) do zarządzania bazą danych. Poniżej znajduje się podstawowa struktura modeli używanych w bazie danych:

- `Creature`: Dane dotyczące zwierząt egzotycznych.
- `Location`: Informacje o ośrodkach hodowlanych.
- `MedicalRecord`: Wydarzenia medyczne związane z zwierzętami.

## Wymagania

Aby rozpocząć pracę nad projektem, potrzebujesz:

- Node.js

## Instalacja

1. Sklonuj repozytorium do swojego lokalnego środowiska.
2. Zainstaluj zależności za pomocą polecenia `npm install`.
3. Skonfiguruj plik `.env` z danymi dostępowymi do swojej bazy danych.
4. Utwórz bazę danych za pomocą Prisma CLI, uruchamiając `npx prisma db push`.
5. Uruchom aplikację za pomocą `yarn dev`.

## Kontrybucje

Chętnie przyjmujemy kontrybucje! Jeśli masz pomysły na ulepszenie projektu, rozwiązanie błędów lub dodanie nowych funkcji, prosimy o założenie pull requesta. Przed przystąpieniem do pracy nad projektem, upewnij się, że przeczytałeś [CONTRIBUTING.md](CONTRIBUTING.md) w celu zapoznania się z naszymi wytycznymi dotyczącymi kontrybucji.

## Licencja

Ten projekt jest dostępny na licencji [MIT License](LICENSE).
