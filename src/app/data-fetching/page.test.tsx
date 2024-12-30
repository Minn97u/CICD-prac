import "@testing-library/jest-dom";
import DataFetchingComponent from "./page";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Post } from "../libs/useJSONPlaceholder";

const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/posts/1", (req, res, ctx) => {
    const fakePost: Post = {
      userId: 1,
      id: 1,
      title: "아아아 집에 가고싶다",
      body: "우아아아 좋다",
    };
    return res(ctx.json(fakePost));
  }),
];

describe("Data Fetching Component Test Page", () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  const renderDataFetchingComponent = () => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity,
        },
      },
    });

    render(
      <QueryClientProvider client={client}>
        {" "}
        <DataFetchingComponent />{" "}
      </QueryClientProvider>
    );
  };
  // Arrange

  it("should render the data fetching component", async () => {
    renderDataFetchingComponent();

    const postBody = await screen.findByText(/body:/i);

    screen.debug();

    await waitFor(() => {
      const postBodyByGetBy = screen.getByText(/body:/i);
      expect(postBodyByGetBy).toBeInTheDocument();
    });

    expect(postBody).toBeInTheDocument();
  });
});
