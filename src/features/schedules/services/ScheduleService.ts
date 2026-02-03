export const scheduleService = {
  submitInitialSchedule: async (payload: any) => {
    return new Promise((resolve) => {
      console.log("--- MOCK API CALL ---");
      console.log(
        "Dữ liệu thu thập được từ FE:",
        JSON.stringify(payload, null, 2),
      );

      setTimeout(() => {
        resolve({ status: 200, message: "Success" });
      }, 1000);
    });
  },
};
