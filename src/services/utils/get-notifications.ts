import { NotificationsResponse } from "@/@types/notifications"

export const getNotifications = async ({ page }: { page: string | null }) => {
  //   const response = await InaashApi.get<NotificationsResponse>("/notifications/list", {
  //     params: {
  //       page,
  //     },
  //   })
  //   return response.data.data.items
  await new Promise((res) => {
    setTimeout(() => {
      res(true)
    }, 1000)
  })
  const response: NotificationsResponse = {
    status: true,
    message: "Notifications retrieved successfully",
    data: {
      helpers: {
        introduction: {
          title: "Welcome to Notifications",
          description: "Here you can view all your recent notifications.",
        },
      },
      items: {
        data: [
          {
            id: "1",
            name: "Notification One",
            date: "2024-12-14",
            type: "info",
          },
          {
            id: "2",
            name: "Notification Two",
            date: "2024-12-13",
            type: "alert",
          },
          {
            id: "3",
            name: "Notification Three",
            date: "2024-12-12",
            type: "reminder",
          },
        ],
        links: {
          first: "https://api.example.com/notifications?page=1",
          last: "https://api.example.com/notifications?page=10",
          prev: null,
          next: null,
        },
        meta: {
          current_page: page ? Number(page) : null,
          from: 1,
          last_page: 3,
          links: [
            { url: "https://api.example.com/notifications?page=1", label: "1", active: true },
            { url: "https://api.example.com/notifications?page=2", label: "2", active: false },
            { url: null, label: "...", active: false },
            { url: "https://api.example.com/notifications?page=10", label: "10", active: false },
          ],
          path: "https://api.example.com/notifications",
          per_page: 10,
          to: 10,
          total: 100,
        },
      },
    },
    guard: "user",
    errors: null,
    response_code: 200,
    request_body: {
      per_page: 10,
      page: 1,
      sort_column: "date",
      sort_direction: "desc",
      date_from: new Date("2024-12-01"),
      date_to: new Date("2024-12-14"),
    },
  }
  return response.data.items
}
