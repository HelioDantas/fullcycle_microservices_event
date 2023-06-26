export default class Registry {
  dependecies: any = {}

  provide(name: string, value: any): void {
    this.dependecies[name] = value
  }

  inject(name: string): any {
    return this.dependecies[name]
  }
}
