# Карта миграции Boards: Redux Toolkit (RTK Query) → TanStack Query

> Только анализ. Код не менялся. Номера строк — по состоянию рабочей копии на 2026-10-21 (коммит `1d9326a` + незакоммиченная TS-миграция: `src/main.tsx`, `src/types/index.ts`).
> Ориентир API — TanStack Query v5 (`isPending`, `gcTime`, `placeholderData`, `queryOptions`, mutation `scope`). Если "latest" уже новая мажорная версия, сначала прочитай её **Migration guide** и сверь названия.

---

## 0. Главный вывод

- В проекте **нет слайсов, `createSlice`, `createAsyncThunk`, ручных редьюсеров и селекторов**. Весь Redux — это **два RTK Query API** (`createApi`), то есть уже "серверный кэш".
- **UI-состояния в Redux нет.** Оно уже живёт в `useState`, контексте, URL и router state (см. 1.3).
- Значит миграция = замена RTK Query на TanStack Query 1:1 по эндпоинтам + перенос логики `providesTags`/`invalidatesTags` в query keys и инвалидацию.
- Самое сложное место — автосохранение задачи (раздел 3.1): RTK Query 2.x по умолчанию откладывает рефетч после инвалидации, пока идут мутации. TanStack Query так не делает.

---

## 1. Инвентаризация Redux

### 1.1. Store и подключение

| Что | Файл:строка | Тип | Судьба |
|---|---|---|---|
| `configureStore`: два reducer'а `boards`, `tasks` + два middleware | `src/redux/index.js:5-12` | инфраструктура | удалить в последнем шаге |
| `<Provider store={store}>` | `src/main.tsx:21` | инфраструктура | заменить на `QueryClientProvider` |
| `useAction` (обёртка над `useDispatch`) | `src/hooks/useAction.js:1-13` | мёртвый код (нигде не используется) | удалить вместе с `react-redux` |

### 1.2. API-"слайсы" (RTK Query)

`boardsApi` — `src/redux/services/boardsApi.js`, `reducerPath: "boards"` (стр. 4), `baseUrl: "/api/boards"` (стр. 5), `tagTypes: ["Board"]` (стр. 6).

| Эндпоинт | Строки | Тип RTK | Теги | Трансформация | Состояние |
|---|---|---|---|---|---|
| `getBoards(search)` | 8-18 | query | provides: `Board:<id>` каждого + `Board:LIST` (10-16) | сортировка по `id` desc (17) | **серверные данные** |
| `getBoard(id)` | 19-28 | query | provides: `result` + `Board:LIST` (21-27) | — | **серверные данные** |
| `postBoard(body)` | 29-36 | mutation | invalidates `Board:LIST` (35) | — | серверная мутация |
| `deleteBoard(id)` | 37-43 | mutation | invalidates `Board:LIST` (42) | — | серверная мутация |
| `patchBoard({id,...body})` | 44-51 | mutation | invalidates `Board:LIST` (50) | — | серверная мутация |

`tasksApi` — `src/redux/services/tasksApi.js`, `reducerPath: "tasks"` (стр. 4), `baseUrl: "/api/tasks"` (стр. 5), `tagTypes: ["Task"]` (стр. 6).

| Эндпоинт | Строки | Тип RTK | Теги | Трансформация | Состояние |
|---|---|---|---|---|---|
| `getTasks({boardId, searchParams})` | 8-18 | query | provides: `Task:<id>` + `Task:LIST` (10-16) | сортировка по `id` desc (17) | **серверные данные** |
| `getTask(id)` | 19-28 | query | provides: `result` + `Task:LIST` (21-27) | — | **серверные данные** |
| `postTask(body)` | 29-36 | mutation | invalidates `Task:LIST` (35) | — | серверная мутация |
| `deleteTask(id)` | 37-43 | mutation | invalidates `Task:LIST` (42) | — | серверная мутация |
| `patchTask({id,...body})` | 44-51 | mutation | invalidates `Task:LIST` (50) | — | серверная мутация |

Наблюдения, важные для переноса поведения:

- `boardsApi.js:23` и `tasksApi.js:23` кладут в теги сам объект `result` без поля `type`. Это не валидный тег `Board`/`Task`. Поэтому **детальные запросы обновляются только через `LIST`**. Фактическое поведение сейчас: "любая мутация сущности перезапрашивает все списки и все открытые детали этой сущности".
- Два отдельных `createApi`: мутации досок **не трогают кэш задач**. Удаление доски в MSW каскадно удаляет её задачи (`src/mocks/db.js:34-47`, вызов в `:88`), а кэш задач об этом не узнаёт.
- Селекторов в классическом смысле нет. Их роль играют `selectFromResult` в `EditBoardPage.jsx:7-9` и `EditTaskPage.jsx:7-9` (см. 3.2).

### 1.3. UI-состояние (в Redux его нет, переносить не нужно)

| Состояние | Где живёт сейчас | Файл:строка | Рекомендация |
|---|---|---|---|
| Поиск досок `?board=` | URL | `SearchbarContainer.jsx:6-8`, `LayoutPage.jsx:7-8` | оставить в URL; станет частью query key |
| Поиск задач `?task=` | URL | `SearchbarContainer.jsx:6-8`, `BoardPage.jsx:10-11` | оставить в URL; станет частью query key |
| `boardId`, `taskId`, `action` | URL-параметры роутера | `PageRoutes.jsx:12-15`, `ModalRoutes.jsx:7-10` | оставить; часть query key |
| Модалка поверх страницы (`previousLocation`) | router state | `App.jsx:8,12-13`, ссылки `Navbar.jsx:35-41`, `Header.jsx:19-35`, `TaskPreview.jsx:16-22` | оставить |
| Статус анимации модалки | `useState` | `useModal.js:6-8` | оставить |
| Скрытие сайдбара (`isHidden`, `isHidable`) | React Context | `HiddableContentContextProvider.jsx:9-10,52` | оставить |
| Значения форм | Formik | `TaskFormContainer.jsx:27-52`, `BoardFormContainer.jsx:25-39` | оставить; но см. конфликт `enableReinitialize` с кэшем (3.1, 3.2) |

Побочное наблюдение: `setSearchParams({ [param]: value })` (`SearchbarContainer.jsx:8`) заменяет **все** параметры. Ввод в поиск задач стирает `?board=`, и список досок меняет query key. Это не про миграцию, но в Devtools ты увидишь лишние запросы досок.

---

## 2. Таблица "было → станет"

Предлагаемая иерархия ключей (ключи повторяют REST-ресурсы; корень = сущность):

- `['boards']` — корень всего по доскам
- `['boards', 'list', { search }]` — список (search нормализовать: `null`/`""`/`undefined` → одно значение)
- `['boards', 'detail', id]` — одна доска (`id` одного типа везде; см. 6)
- `['tasks']` — корень всего по задачам
- `['tasks', 'list', { boardId, search }]`
- `['tasks', 'detail', id]`

Альтернатива: вложить задачи под доску `['boards', boardId, 'tasks', { search }]`. Плюс — удаление доски чистит её задачи по префиксу. Минус — `GET /api/tasks/:id` не знает `boardId`, детали задачи всё равно придётся держать отдельно. Выбор за тобой; ниже — плоский вариант.

### 2.1. Запросы (→ `useQuery`)

| Было | HTTP | Станет | Query key | Где используется |
|---|---|---|---|---|
| `getBoards` `boardsApi.js:8-18` | `GET /api/boards` или `GET /api/boards?title_like=<s>` | `useQuery` + `placeholderData` (предыдущие данные при смене поиска) + сортировка в `queryFn` или `select` | `['boards','list',{search}]` | `LayoutPage.jsx:9-13` (arg `searchParams.get("board")` → `null`, если нет); `EditBoardPage.jsx:7-9` (arg `undefined` + поиск по id) |
| `getBoard` `boardsApi.js:19-28` | `GET /api/boards/:id` | `useQuery` | `['boards','detail',id]` | `BoardPage.jsx:19-23` → `Header` (`BoardPage.jsx:34`) |
| `getTasks` `tasksApi.js:8-18` | `GET /api/tasks?boardId=<id>[&q=<s>]` | `useQuery` + `placeholderData` + сортировка | `['tasks','list',{boardId,search}]` | `BoardPage.jsx:13-17` → `Board` (`:35`); `EditTaskPage.jsx:7-9` (без `search` + поиск по id) |
| `getTask` `tasksApi.js:19-28` | `GET /api/tasks/:id` | `useQuery` | `['tasks','detail',id]` | `TaskPage.jsx:11` → `Header` (`:19`), `Task` (`:20`) |

### 2.2. Мутации (→ `useMutation`)

| Было | HTTP | Вызывается | Что сейчас инвалидируется (факт) | Что делать в TanStack |
|---|---|---|---|---|
| `postBoard` `boardsApi.js:29-36` | `POST /api/boards` body `{title}` → 201 + созданный doc | `CreateBoardPage.jsx:5-6` → `BoardFormContainer.jsx:13-16` (без `await`, модалка закрывается сразу) | все `getBoards` + все активные `getBoard` | инвалидировать `['boards','list']`; детали не трогать |
| `patchBoard` `boardsApi.js:44-51` | `PATCH /api/boards/:id` → обновлённый doc | `EditBoardPage.jsx:12,14` → `BoardFormContainer.jsx:13-16` | все `getBoards` + `getBoard` (так обновляется заголовок в `Header`) | обновить `['boards','detail',id]` из ответа **или** инвалидировать; инвалидировать `['boards','list']` (сортировка/фильтр `title_like` могут поменяться). Короче: инвалидировать `['boards']` |
| `deleteBoard` `boardsApi.js:37-43` | `DELETE /api/boards/:id` → `{}` | `EditBoardPage.jsx:11,14` → `BoardFormContainer.jsx:18-22` (`onDelete` → сразу `navigate("/")`) | все `getBoards` + `getBoard` удалённой (если ещё смонтирован → 404); **задачи не трогаются** | удалить из кэша `['boards','detail',id]` (не инвалидировать: иначе рефетч в 404); инвалидировать `['boards','list']`; удалить/инвалидировать `['tasks','list',{boardId}]` и детали задач этой доски (бэкенд-каскад, `db.js:34-47`) |
| `postTask` `tasksApi.js:29-36` | `POST /api/tasks` body = вся задача | `CreateTaskPage.jsx:5-6` → `TaskFormContainer.jsx:15-18` | все `getTasks` + все активные `getTask` | инвалидировать `['tasks','list']` (можно сузить до `boardId`) |
| `patchTask` (форма) `tasksApi.js:44-51` | `PATCH /api/tasks/:id` → обновлённый doc | `EditTaskPage.jsx:12,14` → `TaskFormContainer.jsx:15-18`, режим `action === "edit"` | все `getTasks` + `getTask` (так обновляется заголовок в `Header` на `TaskPage`) | `['tasks','detail',id]` из ответа; инвалидировать `['tasks','list']` |
| `patchTask` (автосейв) | то же | `TaskAutoSaveFormContainer.jsx:9-11` → `submitForm` → `TaskFormContainer.jsx:15-18`; рендер в `TaskFormContainer.jsx:56-57` (модалка `review`) и `:67` (inline на `TaskPage.jsx:21`) | то же, на **каждое** изменение формы | то же + сериализация/отмена гонок (см. 3.1); кандидат на optimistic update |
| `deleteTask` `tasksApi.js:37-43` | `DELETE /api/tasks/:id` → `{}` | `EditTaskPage.jsx:11,14` → `TaskFormContainer.jsx:20-24` (`onDelete` → сразу `navigate('/board/:boardId')`) | все `getTasks` + `getTask` удалённой (на `TaskPage` → 404 → `/error`) | удалить `['tasks','detail',id]`; инвалидировать `['tasks','list']` |

Задачи не влияют на данные досок (у доски нет счётчика задач). Межсущностная связь только одна: удаление доски → её задачи.

---

## 3. Места повышенного риска

### 3.1. Автосохранение (`TaskAutoSaveForm`) — риск №1

| Факт в коде | Файл:строка | Почему опасно в TanStack |
|---|---|---|
| `submitForm()` в `useEffect` на **каждое** изменение `values`, включая монтирование | `TaskAutoSaveFormContainer.jsx:9-11` | Каждый клик по чекбоксу/статусу = отдельный `PATCH`. На монтировании тоже `PATCH` (блокирует только Yup, если `title` пуст) |
| **Debounce нет.** `useDebounceCallback` существует, но не используется, и у него сломаны зависимости (`[debounce]` → колбэк замораживается с первым замыканием) | `src/hooks/useDebounceCallback.js:4-5` | Если решишь добавлять debounce, не бери этот хук как есть |
| `enableReinitialize`: форма сбрасывается, когда меняется `task` из кэша | `TaskFormContainer.jsx:28-38` | После `PATCH` → инвалидация → рефетч. Если ответ рефетча **устарел** (запрос ушёл до второго `PATCH`), форма откатится к старым значениям. `useEffect` снова вызовет `submitForm` и **отправит старые значения**: клик пользователя потерян |
| Сейчас это почти не проявляется | RTK Query 2.x, `invalidationBehavior: 'delayed'` по умолчанию | RTK ждёт окончания всех мутаций перед рефетчем. **В TanStack такого нет**: нужно самому решить, как не рефетчить/не перезаписывать во время серии мутаций |
| Порядок `PATCH` не гарантирован | — | MSW отвечает мгновенно, гонки не видны. С реальным сервером ответы могут прийти не по порядку |
| Источник данных формы — **список**, а не деталь | `EditTaskPage.jsx:7-9` | На `TaskPage` одна задача приходит из двух кэшей (`getTask` в `TaskPage.jsx:11` и `getTasks` в `EditTaskPage.jsx:7`). Обновлять придётся оба, иначе форма и заголовок разойдутся |
| В режиме `review` модалка поверх `BoardPage`; превью показывает "x of y subtasks" | `TaskPreview.jsx:10-14` | Список задач доски должен обновиться после автосейва |
| StrictMode: эффект монтирования выполняется дважды | `main.tsx:20` | 2 `PATCH` на открытие в dev. Мутации не дедуплицируются |

Что изучить для решения: mutation `scope` (последовательные мутации), `cancelQueries`, `setQueryData` из ответа вместо инвалидации, `useIsMutating`/`isMutating` перед инвалидацией, optimistic updates + rollback.

### 3.2. Компонент читает данные, загруженные другим экраном

| Место | Файл:строка | Проблема |
|---|---|---|
| `EditBoardPage` ищет доску в списке `getBoards(undefined)` | `EditBoardPage.jsx:7-9` | `LayoutPage` грузит `getBoards(null)` (`LayoutPage.jsx:13`). Для RTK это **другой** кэш-ключ, поэтому модалка редактирования делает свой `GET /api/boards`. Пока он идёт, `board === undefined`: форма в режиме "Create new board". Последний коммит `1d9326a` чинил именно это (`enableReinitialize` в `BoardFormContainer.jsx:26`) |
| `EditTaskPage` ищет задачу в списке `getTasks({boardId})` | `EditTaskPage.jsx:7-9` | `BoardPage` грузит `{boardId, searchParams}` (`BoardPage.jsx:17`) — другой ключ. При прямом заходе по URL или с неверным `boardId` задача `undefined`: форма в режиме создания, а `onSubmit` = `patchTask` без `id` (`PATCH /api/tasks/undefined`) |
| Оба пункта | — | В TanStack: брать деталь `['…','detail',id]` и подсовывать данные из списка через `initialData`/`placeholderData`, либо `enabled` до готовности. Не рендерить форму, пока нет данных |

### 3.3. Навигация после мутации

| Место | Файл:строка | Риск |
|---|---|---|
| Удаление доски: `onDelete` и сразу `navigate("/")`, без ожидания | `BoardFormContainer.jsx:18-22` | Ошибку удаления никто не увидит. Если `['boards','detail',id]` ещё активен в момент инвалидации → рефетч → 404 → `BoardPage.jsx:25-26` уводит на `/error` |
| Удаление задачи: `onDelete` и сразу `navigate('/board/:boardId')` | `TaskFormContainer.jsx:20-24` | То же для `TaskPage.jsx:13-14` |
| Создание/правка: модалка закрывается до ответа | `BoardFormContainer.jsx:13-16`, `TaskFormContainer.jsx:15-18` | Колбэки, переданные в `mutate(...)`, **не вызываются**, если компонент уже размонтирован. Инвалидацию держи в опциях `useMutation`, не в `mutate` |
| Создание доски не ведёт на новую доску | `BoardFormContainer.jsx:13-16` | Если захочешь, понадобится `id` из ответа `POST` (201 + doc, `handlers.js:62-74`) → `mutateAsync`/`onSuccess` |

### 3.4. Зависимости между запросами

| Место | Файл:строка | Что учесть |
|---|---|---|
| `BoardPage`: два параллельных запроса, общий лоадер и общая ошибка | `BoardPage.jsx:13-31` | Комбинирование `isPending`/`isError` двух `useQuery` |
| `TaskPage` + встроенный `EditTaskPage` | `TaskPage.jsx:11,21`, `EditTaskPage.jsx:7` | Два запроса за одной задачей (деталь + список доски) |
| Модальные роуты с необязательными параметрами | `ModalRoutes.jsx:8,10` (`:boardId?`, `:taskId?`) | Ключ с `undefined` id → нужен `enabled`/`skipToken` |
| Поиск по каждой букве | `SearchbarContainer.jsx:7-8` | Каждая буква = новый ключ и новый запрос (так и сейчас). См. 6, пункт про `isPending` |

### 3.5. Оптимистичные обновления

Сейчас их **нет**: всё через инвалидацию. Естественный кандидат — чекбоксы подзадач и статус в автосейве (`TaskAutoSaveForm.jsx:17-28,31-45`). Делать **после** того, как автосейв заработает без них.

---

## 4. Порядок миграции

Общее правило на время перехода: **RTK-мутация не инвалидирует TanStack-кэш, и наоборот.** Держи чтение и мутации одной сущности в соседних шагах, либо мирись с временно устаревшими данными.

| # | Шаг | Готово, когда |
|---|---|---|
| 0 | Установить TanStack Query + Devtools, создать `QueryClient`, обернуть приложение в `QueryClientProvider` рядом с Redux `Provider` (`main.tsx:21`). Осознанно выбрать дефолты `retry`, `refetchOnWindowFocus`, `staleTime` | Приложение работает как раньше, Devtools открываются, в них пусто |
| 1 | `getBoard` → `useQuery` в `BoardPage.jsx:19-23` (read-only, один ключ) | Заголовок доски в `Header` есть; в Devtools `['boards','detail',id]`; 404 по несуществующему id ведёт на `/error` |
| 2 | `getBoards` → `useQuery` в `LayoutPage.jsx:9-13` с поиском и сохранением предыдущих данных | Поиск досок работает, счётчик в `Navbar` не мигает лоадером на каждую букву; невалидный regex (например `[`) ведёт на ошибку без долгой задержки |
| 3 | Вынести ключи и `queryFn` в одно место (фабрика ключей / `queryOptions`) | Ключи досок нигде не пишутся литералами в компонентах |
| 4 | `postBoard` → `useMutation` (`CreateBoardPage.jsx:5`) | Новая доска появляется в сайдбаре без перезагрузки, в т.ч. при активном поиске |
| 5 | `patchBoard` + `EditBoardPage` читает деталь, а не список (`EditBoardPage.jsx:7-9,12`) | Правка заголовка сразу видна и в сайдбаре, и в `Header`; при открытии по прямой ссылке форма не мелькает режимом "Create" |
| 6 | `deleteBoard` (`EditBoardPage.jsx:11`, `BoardFormContainer.jsx:18-22`) | После удаления: редирект на `/`, доски нет в списке, нет запроса `GET /api/boards/:id` с 404, нет перехода на `/error` |
| 7 | `getTasks` → `useQuery` в `BoardPage.jsx:13-17` с поиском | Поиск задач не размонтирует поле ввода (фокус остаётся); пустое состояние "Can't find requested tasks" работает |
| 8 | `getTask` → `useQuery` в `TaskPage.jsx:11` | Страница задачи открывается по прямой ссылке; 404 ведёт на `/error`, а не падает на `task.description` (`Task.jsx:6`) |
| 9 | `postTask` (`CreateTaskPage.jsx:5`) | Новая задача сразу в списке доски |
| 10 | `deleteTask` (`EditTaskPage.jsx:11`, `TaskFormContainer.jsx:20-24`) | После удаления со страницы задачи: редирект на доску, задачи нет, нет 404 и `/error` |
| 11 | `patchTask` из полной формы (`action === "edit"`) + `EditTaskPage` на деталь вместо списка | Правка в модалке поверх доски и поверх `TaskPage` обновляет превью и `Header` |
| 12 | Автосейв (`TaskAutoSaveFormContainer.jsx:9-11`): решить про debounce, сериализацию, защиту от устаревших ответов | Быстрые 5-10 кликов по чекбоксам при throttling "Slow 3G" не откатываются; итог на сервере = итог на экране; лишних `PATCH` нет |
| 13 | (опционально) Optimistic update для чекбоксов/статуса с откатом при ошибке | Клик отражается мгновенно; при принудительной ошибке (MSW 500) значение откатывается |
| 14 | Удалить Redux: `src/redux/`, `Provider` в `main.tsx`, `useAction.js`, пакеты `@reduxjs/toolkit`, `react-redux` | Поиск по `redux`/`react-redux`/`@reduxjs` по `src/` пуст; `npm run build` и `npm run typecheck` проходят |

---

## 5. Что почитать (официальная документация TanStack Query, React)

| Шаг | Разделы |
|---|---|
| 0 | Overview; Installation; Quick Start; **Important Defaults**; Devtools; `QueryClient` / `QueryClientProvider` (Reference); TypeScript; Migrating to TanStack Query v5 (или более новый Migration guide) |
| 1 | Queries; **Query Keys**; Query Functions (раздел про обработку ошибок и `fetch`); Query Retries; Caching Examples; `useQuery` (Reference) |
| 2 | **Paginated / Lagged Queries** (`placeholderData`); Placeholder Query Data; Background Fetching Indicators; Window Focus Refetching; Render Optimizations (`select`) |
| 3 | Query Options (`queryOptions`); Query Keys; Filters (Query Filters) |
| 4 | **Mutations**; Invalidations from Mutations; **Query Invalidation**; `useMutation` (Reference) |
| 5 | Updates from Mutation Responses; Initial Query Data (данные из списка для детали); Disabling/Pausing Queries (`enabled`, `skipToken`) |
| 6 | Filters; `QueryClient.removeQueries` / `invalidateQueries` (Reference); раздел Mutations про колбэки `mutate` и размонтирование |
| 7 | Paginated / Lagged Queries (повтор); Background Fetching Indicators |
| 8 | Dependent Queries; Parallel Queries; Query Retries |
| 9-10 | Mutations; Query Invalidation; Filters |
| 11 | Updates from Mutation Responses; Initial Query Data |
| 12 | Mutations: **Mutation Scopes**, Consecutive mutations, `mutateAsync`; **Query Cancellation**; `useIsMutating` / `useMutationState`; Network Mode |
| 13 | **Optimistic Updates** (via the UI / via the cache); Mutation lifecycle (`onMutate`/`onError`/`onSettled`) |
| 14 | Does TanStack Query replace Redux, MobX or other global state managers? |
| Доп. | В "Community Resources" документации — блог TkDodo: "Effective React Query Keys", "Mastering Mutations in React Query", "React Query and Forms", "Concurrent Optimistic Updates in React Query". Последние два прямо про ваш Formik + автосейв |

---

## 6. Подводные камни именно в этом проекте

| Тема | RTK Query сейчас | TanStack Query по умолчанию | Где ударит |
|---|---|---|---|
| Кэш при возврате на экран | данные переиспользуются без рефетча (`refetchOnMountOrArgChange: false`), хранятся 60 с | `staleTime: 0` → рефетч при каждом монтировании; `gcTime` 5 мин | Переходы доска ↔ задача ↔ доска: больше запросов в Network |
| Фокус окна | рефетча нет | `refetchOnWindowFocus: true` | Alt-Tab во время правки в модалке: рефетч → `enableReinitialize` (`TaskFormContainer.jsx:28`) сбросит форму, если данные на сервере изменились |
| Повторы | нет | `retry: 3` с экспоненциальной задержкой | 404 на `getTask`/`getBoard` и 500 на невалидный regex (`handlers.js:57-58`) ведут на `/error` с задержкой в секунды |
| Ошибки HTTP | `fetchBaseQuery` считает 4xx/5xx ошибкой | `fetch` **не бросает** на 4xx/5xx; без проверки 404 станет "успехом" с `{}` (`handlers.js:4`) | `TaskPage` отрисует `{}` → падение на `task.description.length` (`Task.jsx:6`) |
| Загрузка при смене аргумента | `isLoading` только при первой загрузке; при новом аргументе показываются старые `data` | новый ключ без данных → `isPending: true`, `data: undefined` | `BoardPage.jsx:27-31` заменит `Board` (с полем поиска) на `Plug`: инпут размонтируется, фокус теряется. `Navbar.jsx:22` — лоадер вместо счётчика на каждую букву |
| `isPending` vs `isLoading` vs `isFetching` | `isLoading`/`isFetching` | `isPending` = нет данных; `isLoading` = `isPending && isFetching`; выключенный (`enabled: false`) запрос висит в `isPending` | Лоадеры в `BoardPage.jsx:27`, `TaskPage.jsx:15`, `Navbar.jsx:22` |
| Межкомпонентная инвалидация | раздельные API (доски ≠ задачи) | один `QueryClient` | Плюс: удаление доски может почистить задачи. Минус: можно случайно инвалидировать слишком широко |
| `transformResponse` | сортировка в эндпоинте (`:17`) | нет аналога; `queryFn` или `select` | `select` выполняется на каждого наблюдателя; `sort` мутирует массив |
| Тип id в ключах | — | `useParams` даёт строки, ответы — числа (`types/index.ts:4,18`) | `['boards','detail','3']` ≠ `['boards','detail',3]`: `setQueryData` из ответа промахнётся мимо активного запроса |
| `null`/`""`/`undefined` в поиске | уже даёт 2 кэша (`LayoutPage` `null` vs `EditBoardPage` `undefined`) | то же: разные ключи | Лишние запросы, "пустая" форма редактирования (3.2) |
| MSW + localStorage | — | — | Данные живут между перезагрузками (`db.js:3-17`), кэш — нет. `resetBoardsDb()` (`browser.js:8-11`) делает reload, кэш сбрасывается. MSW отвечает мгновенно: гонки и лоадеры не видны, тестируй с throttling. Первый запрос должен идти после `worker.start` (`main.tsx:18` уже ждёт) |
| Реальный бэкенд | — | — | `VITE_USE_MOCKS=false` → прокси на `localhost:3000` (`vite.config.ts`), но json-server удалён (`c750018`) |
| StrictMode (dev) | запросы дедуплицируются | запросы по одному ключу тоже дедуплицируются | А вот мутации из эффектов — нет: автосейв на монтировании шлёт 2 `PATCH` (`main.tsx:20`, `TaskAutoSaveFormContainer.jsx:9-11`) |
| Колбэки `mutate` | `unwrap`/промис | колбэки в `mutate(vars, {onSuccess})` не вызываются после размонтирования | Модалки закрываются до ответа (3.3) |
| Незавершённая TS-миграция | — | генерики `useQuery`/`useMutation`, `queryOptions` для типизированных ключей | `main.tsx`, `types/index.ts` уже TS, остальное — JSX |

---

## 7. Чек-лист ручной проверки (после каждого шага)

Подготовка: Devtools TanStack Query открыты, вкладка Network с фильтром `/api/`, режим throttling "Slow 3G" для части проверок.

- [ ] `npm run dev` стартует, в консоли нет ошибок и предупреждений React.
- [ ] `npm run typecheck` и `npm run build` проходят.
- [ ] В Devtools ровно те ключи, которые ты ожидаешь; нет дублей из-за `null`/`""`/строк vs чисел.
- [ ] Network: на одно действие — ожидаемое число запросов (учти StrictMode в dev).
- [ ] Открытие главной `/`: список досок, счётчик, поиск досок (включая невалидный regex `[`).
- [ ] Прямая ссылка `/board/:id` и `/board/:id/task/:taskId` после F5: данные грузятся, лоадер `Plug` показан один раз.
- [ ] Несуществующий id в URL → `/error` → через 2 с на `/` (`ErrorPageContainer.jsx:9`).
- [ ] Поиск задач и досок: фокус в инпуте не теряется, старые результаты видны до прихода новых.
- [ ] Создание доски/задачи: элемент появляется без F5, в т.ч. при активном поиске.
- [ ] Правка доски/задачи (модалка поверх доски и поверх страницы задачи): обновились сайдбар, `Header`, превью.
- [ ] Удаление доски/задачи: корректный редирект, нет 404-запросов и перехода на `/error`.
- [ ] Удаление доски с максимальным id, затем создание новой: MSW выдаст тот же id (`db.js:23-30`, max + 1). Старые задачи удалённой доски не должны всплыть из кэша.
- [ ] Автосейв (модалка `review` и `TaskPage`): серия быстрых кликов при "Slow 3G" — итог на экране = итог после F5.
- [ ] Alt-Tab во время правки в модалке: форма не сбрасывается.
- [ ] `resetBoardsDb()` в консоли → данные из `db.json`, без ошибок.
- [ ] (Шаги 12-13) Принудительная ошибка сервера (временно 500 в MSW) — пользователь видит ошибку или откат, данные не теряются молча.

---

## Вопросы

1. Какая именно версия TanStack Query — v5 или уже новее? От этого зависят названия разделов (`isPending`, `gcTime`, `scope`).
2. Будет ли реальный бэкенд или только MSW? Гонки автосейва (3.1) критичны только при реальной сети.
3. Нужен ли debounce автосейву и какой задержки? Сейчас его нет, хотя в задаче он упомянут.
4. Модалки должны закрываться сразу (как сейчас) или после успешного ответа? Как показывать ошибку мутации? Сейчас ошибки мутаций игнорируются.
5. Остаётся ли Formik? `enableReinitialize` + кэш — главный источник конфликтов автосейва.
6. Каскад "доска → задачи" есть только в MSW (`db.js:34-47`). Будет ли он на реальном сервере? От этого зависит, чистить ли кэш задач при удалении доски.
7. TS-миграцию делаешь параллельно с этой или после? Если параллельно, удобно сразу типизировать фабрику ключей.
8. После создания доски переходить на неё? Сейчас не переходит.
