import StyleDictionary from 'style-dictionary'

const sd = new StyleDictionary({
  source: ['src/tokens/figma-export/**/*.json'],
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/build/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'src/tokens/build/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/esm',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/module-declarations',
        },
      ],
    },
  },
})

async function build() {
  await sd.hasInitialized
  await sd.buildAllPlatforms()
  console.log('✓ Tokens built successfully')
}

build()
