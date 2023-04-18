import Text from 'components/Text'
import { useStateStore } from 'state/StoreProvider'
import { defaultPromptTemplate, getDescription } from 'state/prompt'
import { defaultTemplateID } from 'state/store'

import Editor from './Editor'

function Prompt() {
  const [selectors] = useStateStore()
  const model = selectors.use.model()
  const modelSetup = selectors.use.modelSetups().find(p =>
    p.templateID === defaultTemplateID &&
    p.provider === model.provider &&
    p.modelName === model.name
  )
  const prompt = modelSetup?.prompt || defaultPromptTemplate

  return (
    <div className="
    flex
    flex-col
    flex-1
    overflow-hidden
  ">
      <div className="
        flex
        bg-slate-50
        items-center
        justify-between
        border-b
        py-3.5
        pr-4
      ">
        <Text
          text="Prompt"
          size={Text.size.S2}
          className="
            uppercase
            text-slate-400
            font-semibold
            px-4
          "
        />
      </div>
      <div
        className="
      py-8
      px-4
      flex
      flex-1
      bg-white
      justify-center
      overflow-auto
      scroller
      "
      >
        <div className="
      flex
      flex-col
      space-y-6
      max-w-[65ch]
      grow
      ">
          {prompt.map((p, i) =>
            <div
              key={i}
              className="
                flex
                space-y-4
                flex-col
              "
            >
              <div className="flex flex-col">
                <Text
                  className="font-bold text-slate-400"
                  size={Text.size.S2}
                  text={`${p.role} ${p.type.replace(/([A-Z])/g, ' $1')}`.toUpperCase()}
                />
                <Text
                  className="font-medium text-slate-400"
                  size={Text.size.S3}
                  text={getDescription(p)}
                />
              </div>
              <Editor
                // title={`${p.role} ${p.type.replace(/([A-Z])/g, ' $1')}`.toUpperCase()}
                placeholder={`Specify ${p.role} ${p.type.replace(/([A-Z])/g, ' $1').toLowerCase()} prompt here`}
                content={p.content}
                model={model}
                templateID={defaultTemplateID}
                idx={i}
                promptPart={p}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Prompt
