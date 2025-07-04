import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

class NavigationService {
  private router: AppRouterInstance | null = null;

  public setRouter(router: AppRouterInstance): void {
    this.router = router;
  }

  public navigate(path: string, options?: any): void {
    if (this.router) {
      this.router.push(path, options);
    } else {
      console.warn(
        "Navigation Service: Router not set. Falling back to window.location"
      );
      if (typeof window !== "undefined") {
        window.location.href = path;
      }
    }
  }

  public replace(path: string, options?: any): void {
    if (this.router) {
      this.router.replace(path, options);
    } else {
      console.warn(
        "Navigation Service: Router not set. Falling back to window.location"
      );
      if (typeof window !== "undefined") {
        window.location.replace(path);
      }
    }
  }

  public back(): void {
    if (this.router) {
      this.router.back();
    } else {
      console.warn("Navigation Service: Router not set. Cannot go back.");
    }
  }

  public refresh(): void {
    if (this.router) {
      this.router.refresh();
    } else {
      console.warn("Navigation Service: Router not set. Cannot refresh.");
    }
  }
}

const navigationService = new NavigationService();
export default navigationService;
