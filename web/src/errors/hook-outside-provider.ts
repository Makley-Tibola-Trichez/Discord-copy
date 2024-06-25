export class HookOutsideProvider extends Error {
  constructor(hookName: string, providerName: string) {
    super(
      `Hook ${hookName} was called outside of the ${providerName} provider`,
    );

    this.name = "HookOutsideProvider";
  }
}
