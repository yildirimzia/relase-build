import argparse
from os.path import join

from subprocess import check_output, CalledProcessError

PROJECT_STATIC_FILES_FOLDER = 'templates'

GIT_PULL_ORIGIN = ['git', 'pull', 'origin']
GIT_PUSH_ORIGIN = ['git', 'push', 'origin']
GIT_CHECK_OUT = ['git', 'checkout']
GIT_SUBMODULE_UPDATE = ['git', 'submodule', 'update']

YARN_INSTALL = ['yarn', 'install']
YARN_BUILD = ['yarn', 'build']
NPM_INSTALL = ['npm', 'install']
NPM_BUILD = ['npm', 'run', 'build']

COMPILE_MESSAGES = ['python','manage.py','compilemessages']
JSCOMPILE_MESSAGES = ['python','manage.py','jscompilemessages']

def main():
    parser = argparse.ArgumentParser(
        description='This is a script '
                    'that automates creating a staging branch for deployment.')
    parser.add_argument('-d', '--directory',
                        help='Full path to project directory.', required=True)
    parser.add_argument('-pm', '--project-master',
                        help='Master branch of project.', default='master')
    parser.add_argument('-sm', '--submodule-master',
                        help='Master branch of submodule.', default='master')
    parser.add_argument('-b', '--branch', action='append', nargs='*',
                        help='Branches to be merged into dev branch.',
                        required=True)
    parser.add_argument('-dev', '--dev-branch', help='Dev branch name.',
                        required=True)
    parser.add_argument('-ued', '--use-existing-dev',
                        help='Use the dev branch already existing',
                        action='store_true')
    parser.add_argument('-l', '--locales', action='append', nargs='*',
                        help='Compile messages for localization')
    parser.add_argument('-npm', '--build-with-npm',
                        help='Compiler for javascript.', 
                        action='store_true')


    args = parser.parse_args()
    
    project_dir = args.directory
    submodule_dir = join(project_dir, 'omnife_project')
    project_master = args.project_master
    submodule_master = args.submodule_master
    dev_branch = args.dev_branch
    branches_to_merge = args.branch[0]
    use_existing_dev = args.use_existing_dev
    build_with_npm = args.build_with_npm

    project_static_files_dir = join(project_dir, PROJECT_STATIC_FILES_FOLDER)

    exception = True

    try:
        # checkout project master branch
        check_output(GIT_CHECK_OUT + [project_master], cwd=project_dir)
        # pull origin of project master branch
        check_output(GIT_PULL_ORIGIN + [project_master], cwd=project_dir)

        check_output(GIT_SUBMODULE_UPDATE, cwd=project_dir)
        # checkout project submodolue master branch
        check_output(GIT_CHECK_OUT + [submodule_master], cwd=submodule_dir)
        # pull origin of project submodule master branch
        check_output(GIT_PULL_ORIGIN + [submodule_master], cwd=submodule_dir)
        
        # create a temporary branch to fetch and merge pull requests
        if use_existing_dev:
            check_output(GIT_CHECK_OUT + [dev_branch], cwd=project_dir)
        else:
            check_output(GIT_CHECK_OUT + ['-b', dev_branch], cwd=project_dir)

        for branch in branches_to_merge:
            check_output(['git', 'fetch', 'origin', branch], cwd=project_dir)
            check_output(['git', 'merge', 'origin/{}'.format(branch)], cwd=project_dir).decode('utf-8')

        if args.locales != None:
            locales = []
            for locale in args.locales[0]:
                messages = check_output(COMPILE_MESSAGES  + ['-l', locale], cwd=project_dir)
                print(messages)    
                messages = check_output(JSCOMPILE_MESSAGES  + ['-l', locale], cwd=project_dir)
                print(messages)
       
        if build_with_npm:
            check_output(NPM_INSTALL, cwd=project_static_files_dir)
            check_output(NPM_BUILD, cwd=project_static_files_dir)
        else:
            check_output(YARN_INSTALL, cwd=project_static_files_dir)
            check_output(YARN_BUILD, cwd=project_static_files_dir)

        exception = False
        
        print('Javascript build commit')
        check_output(['git', 'add', 'static_omnishop'], cwd=project_dir)
        check_output(['git', 'commit', '-n', '-am', '"npm/yarn build"'], cwd=project_dir)

        # commit new files
        status = check_output(['git', 'status'], cwd=project_dir).decode('utf-8')

        if 'nothing to commit, working tree clean' not in status.split('\n'):
            print('git add commit')
            check_output(['git', 'add', '-A'], cwd=project_dir)
            check_output(['git', 'commit', '-n', '-m', '"Added dist files."'], cwd=project_dir)

    except CalledProcessError as e:
        output = e.output.decode('utf-8').split('\n')

        if exception:
            print(e.output.decode('utf-8'))

        if 'Automatic merge failed; fix conflicts and then commit the result.' in output:
            print('----------ERROR CONFLICT----------')
        elif 'fatal error' in output:
             print('----------ERROR MESSAGES COMPILE----------')
        elif e.returncode == 2:
             print('----------ERROR YARN BUILD----------')
        elif exception: 
            print('----------ERROR----------')
        else:
            print('Created {} staging branch successfully.'.format(dev_branch))
    else:
        print('Created {} staging branch successfully.'.format(dev_branch))


if __name__ == '__main__':
    main()