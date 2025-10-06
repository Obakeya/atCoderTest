export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [H, W] = lines[0].split(' ').map(Number)

  const g: string[] = []
  for (let i = 1; i <= H; i++) {
    g.push(lines[i])
  }

  const ok = (i: number, j: number): boolean => {
    return 0 <= i && i < H && 0 <= j && j < W
  }

  const test = (i: number, j: number, d: number): boolean => {
    for (const x of [+d, -d]) {
      for (const y of [+d, -d]) {
        const s = i + x
        const t = j + y
        if (!ok(s, t) || g[s][t] !== '#') return false
      }
    }
    return true
  }

  const N = Math.min(H, W)
  const ans = Array(N + 1).fill(0)

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (g[i][j] !== '#') continue

      if (test(i, j, 1)) {
        let d = 1
        while (test(i, j, d + 1)) d++
        ans[d]++
      }
    }
  }

  const result = []
  for (let i = 1; i <= N; i++) {
    result.push(ans[i])
  }
  console.log(result.join(' '))
}
