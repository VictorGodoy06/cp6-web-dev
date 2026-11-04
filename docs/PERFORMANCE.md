# Evidência de performance mobile

URL pública: https://cp6-web-dev-nine.vercel.app/

[Relatório inicial PageSpeed Insights / Lighthouse mobile](https://pagespeed.web.dev/analysis/https-cp6-web-dev-nine-vercel-app/fnow6y8zrg?form_factor=mobile)

Medição de 03/11/2026 às 21:15 (São Paulo), em Moto G Power emulado, rede Slow 4G, Lighthouse 13.6.0:

| Métrica                  | Resultado |
| ------------------------ | --------- |
| Performance              | 100/100   |
| Acessibilidade           | 95/100    |
| Boas práticas            | 100/100   |
| SEO                      | 92/100    |
| First Contentful Paint   | 0,8 s     |
| Largest Contentful Paint | 1,7 s     |
| Total Blocking Time      | 0 ms      |
| Cumulative Layout Shift  | 0         |
| Speed Index              | 0,9 s     |

O requisito de performance mobile mínima 80 foi observado nesta medição. É um teste de laboratório: os valores podem variar entre execuções, e não há dados de campo suficientes no relatório.

O relatório inicial indicou contraste insuficiente nos números decorativos do editor e robots.txt inválido porque o fallback da SPA devolvia HTML. Os ajustes posteriores clareiam esses números e adicionam um robots.txt real. Uma nova medição precisa confirmar o efeito desses ajustes.

Contato com e-mail e painel autenticado têm verificação separada; estas notas não comprovam o funcionamento deles.
