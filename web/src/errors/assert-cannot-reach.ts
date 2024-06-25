/**
 *
 * @param _x Não é utilizado pois ele vai funcionar como linter ao usar a função, aonde se o parâmetro passado for diferente de never, ele vai lançar um erro
 *
 */

import { ShouldNotReachError } from "./should-not-reach-error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertCannotReach = (_x: never) => {
  return new ShouldNotReachError();
};
